import test from "node:test";
import assert from "node:assert/strict";
import { buildCardSvg, buildEtag, normalizeCardQuery } from "../api/card.js";

test("normalizes card input safely", () => {
  const card = normalizeCardQuery({
    name: "<script>alert(1)</script>",
    skills: "JavaScript,React,Node,Security",
    theme: "missing",
    width: "9999"
  });

  assert.equal(card.theme, "indigo");
  assert.equal(card.width, 1200);
  assert.match(card.name, /&lt;script&gt;/);
  assert.ok(card.skills.length >= 1);
});

test("builds cacheable SVG output", () => {
  const svg = buildCardSvg({ name: "Demo", theme: "aurora" });
  assert.match(svg, /<svg/);
  assert.match(svg, /Demo/);
  assert.match(buildEtag(svg), /^"[a-f0-9]{16}"$/);
});
