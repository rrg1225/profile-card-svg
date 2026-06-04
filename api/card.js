export default function handler(req, res) {
  const escapeHTML = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  // 1. 获取用户链接中传入的自定义参数（带默认值防护）并立即转义
  const {
    name = "Developer",
    role = "Full Stack Engineer",
    skills = "JavaScript,React,Node",
    theme = "indigo",
    status = "Building in public",
    width = "880"
  } = req.query;

  const safeName = escapeHTML(name);
  const safeRole = escapeHTML(role);
  const safeStatus = escapeHTML(status);
  const safeSkills = escapeHTML(skills);

  // 2. 统一参数处理
  const cardWidth = Number.parseInt(width, 10) || 880;
  const cardHeight = 180;
  const skillArray = safeSkills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  // 3. 预定义主题色彩映射
  const themeMap = {
    indigo: { start: "#4f46e5", end: "#06b6d4", text: "#ffffff" },
    green: { start: "#0f766e", end: "#10b981", text: "#ffffff" },
    sunset: { start: "#f97316", end: "#ea580c", text: "#ffffff" },
    midnight: { start: "#0f172a", end: "#1e293b", text: "#f8fafc" },
    aurora: { start: "#22c55e", end: "#06b6d4", text: "#ffffff" },
    dark: { start: "#111827", end: "#1f2937", text: "#cbd5e1" }
  };

  const currentTheme = themeMap[theme] || themeMap.indigo;

  // 4. 生成技能标签 SVG 片段
  const skillTags = skillArray.length
    ? skillArray
        .map((skill, index) => `
        <g transform="translate(${index * 88}, 0)">
          <rect x="0" y="0" width="80" height="26" rx="12" fill="rgba(255,255,255,0.18)" />
          <text x="40" y="17" text-anchor="middle" class="skill-badge">${skill}</text>
        </g>
      `)
        .join("")
    : `<text x="30" y="130" class="skill-empty">No skills provided</text>`;

  // 5. 动态生成 SVG 内容
  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${cardWidth}" height="${cardHeight}" viewBox="0 0 ${cardWidth} ${cardHeight}" fill="none">
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
        <rect width="${cardWidth}" height="${cardHeight}" rx="24" fill="url(#bg-gradient)" />
        <rect x="24" y="24" width="120" height="120" rx="18" fill="rgba(255,255,255,0.08)" />
        <circle cx="${cardWidth - 60}" cy="56" r="34" fill="rgba(255,255,255,0.12)" />
        <circle cx="${cardWidth - 96}" cy="110" r="14" fill="rgba(255,255,255,0.15)" />

        <text x="30" y="54" class="title">👋 Hi, I'm ${safeName}</text>
        <text x="30" y="82" class="role">🚀 ${safeRole}</text>
        <text x="30" y="106" class="status">⚡ ${safeStatus}</text>

        <g transform="translate(30, 124)">${skillTags}</g>
      </g>
    </svg>
  `;

  // 6. 核心响应头设置：SVG 内容类型 + 缓存策略
  res.setHeader("Content-Type", "image/svg+xml;charset=UTF-8");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400");

  return res.status(200).send(svgContent);
}
