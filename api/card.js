import { createHash } from "node:crypto";

const THEMES = {
  indigo: { start: "#4f46e5", end: "#06b6d4", text: "#ffffff" },
  green: { start: "#0f766e", end: "#10b981", text: "#ffffff" },
  sunset: { start: "#f97316", end: "#ea580c", text: "#ffffff" },
  midnight: { start: "#0f172a", end: "#1e293b", text: "#f8fafc" },
  aurora: { start: "#22c55e", end: "#06b6d4", text: "#ffffff" },
  dark: { start: "#111827", end: "#1f2937", text: "#cbd5e1" }
};

const DEFAULT_CARD = {
  name: "Developer",
  role: "Full Stack Engineer",
  skills: "JavaScript,React,Node",
  theme: "indigo",
  status: "Building in public",
  width: 880,
  layout: "standard"
};

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function truncate(value, max) {
  const text = String(value || "").trim();
  return text.length > max ? `${text.slice(0, max - 1)}...` : text;
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function normalizeCardQuery(query = {}) {
  const width = clamp(Number.parseInt(query.width, 10) || DEFAULT_CARD.width, 520, 1200);
  const layout = query.layout === "compact" ? "compact" : "standard";
  const theme = THEMES[query.theme] ? query.theme : DEFAULT_CARD.theme;
  const rawSkills = String(query.skills || DEFAULT_CARD.skills)
    .split(",")
    .map((skill) => truncate(skill, 12))
    .filter(Boolean);
  const visibleSkillCount = Math.max(1, Math.floor((width - 72) / 88));

  return {
    name: escapeHtml(truncate(query.name || DEFAULT_CARD.name, 34)),
    role: escapeHtml(truncate(query.role || DEFAULT_CARD.role, 48)),
    status: escapeHtml(truncate(query.status || DEFAULT_CARD.status, 64)),
    skills: rawSkills.slice(0, visibleSkillCount).map(escapeHtml),
    theme,
    width,
    height: layout === "compact" ? 150 : 180,
    layout
  };
}

export function buildCardSvg(query = {}) {
  const card = normalizeCardQuery(query);
  const currentTheme = THEMES[card.theme];
  const isCompact = card.layout === "compact";
  const skillTags = card.skills.length
    ? card.skills
        .map((skill, index) => `
        <g transform="translate(${index * 88}, 0)">
          <rect x="0" y="0" width="80" height="26" rx="12" fill="rgba(255,255,255,0.18)" />
          <text x="40" y="17" text-anchor="middle" class="skill-badge">${skill}</text>
        </g>
      `)
        .join("")
    : `<text x="30" y="130" class="skill-empty">No skills provided</text>`;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${card.width}" height="${card.height}" viewBox="0 0 ${card.width} ${card.height}" fill="none" role="img" aria-label="${card.name} profile card">
      <style>
        .title { font-family: 'Segoe UI', system-ui, sans-serif; font-weight: 800; font-size: 24px; fill: ${currentTheme.text}; }
        .role { font-family: 'Segoe UI', system-ui, sans-serif; font-weight: 500; font-size: 14px; letter-spacing: 0.02em; fill: rgba(255,255,255,0.88); }
        .status { font-family: 'Segoe UI', system-ui, sans-serif; font-weight: 500; font-size: 12px; fill: rgba(255,255,255,0.78); }
        .skill-badge { font-family: 'Courier New', monospace; font-size: 12px; font-weight: 700; fill: #ffffff; }
        .skill-empty { font-family: 'Segoe UI', system-ui, sans-serif; font-size: 12px; fill: rgba(255,255,255,0.75); }
        .animate-card { animation: fadeIn 0.5s ease-out forwards; opacity: 0; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      </style>

      <defs>
        <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${currentTheme.start}" />
          <stop offset="100%" stop-color="${currentTheme.end}" />
        </linearGradient>
      </defs>

      <g class="animate-card">
        <rect width="${card.width}" height="${card.height}" rx="24" fill="url(#bg-gradient)" />
        <rect x="24" y="24" width="${isCompact ? 96 : 120}" height="${isCompact ? 96 : 120}" rx="18" fill="rgba(255,255,255,0.08)" />
        <circle cx="${card.width - 60}" cy="56" r="34" fill="rgba(255,255,255,0.12)" />
        <circle cx="${card.width - 96}" cy="${isCompact ? 96 : 110}" r="14" fill="rgba(255,255,255,0.15)" />

        <text x="30" y="54" class="title">Hi, I'm ${card.name}</text>
        <text x="30" y="82" class="role">${card.role}</text>
        <text x="30" y="106" class="status">${card.status}</text>

        <g transform="translate(30, ${isCompact ? 116 : 124})">${skillTags}</g>
      </g>
    </svg>
  `;
}

export function buildEtag(svgContent) {
  return `"${createHash("sha256").update(svgContent).digest("hex").slice(0, 16)}"`;
}

export function cacheControlFor(query = {}) {
  if (query.cache === "static") return "public, max-age=86400, immutable";
  if (query.cache === "live") return "no-cache, max-age=0, must-revalidate";
  return "public, max-age=300, s-maxage=300, stale-while-revalidate=600";
}

export default function handler(req, res) {
  const svgContent = buildCardSvg(req.query);
  const etag = buildEtag(svgContent);

  res.setHeader("Content-Type", "image/svg+xml;charset=UTF-8");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("ETag", etag);
  res.setHeader("Cache-Control", cacheControlFor(req.query));

  if (req.headers?.["if-none-match"] === etag) {
    return res.status(304).send("");
  }

  return res.status(200).send(svgContent);
}
