import assert from "node:assert/strict";
import test from "node:test";
import handler, { buildCardSvg, normalizeCardQuery } from "../api/card.js";

function invoke(query = {}, headersIn = {}) {
  const headers = {};
  let statusCode = 0;
  let body = "";

  const res = {
    setHeader(name, value) {
      headers[name.toLowerCase()] = value;
    },
    status(code) {
      statusCode = code;
      return {
        send(value) {
          body = value;
        }
      };
    }
  };

  handler({ query, headers: headersIn }, res);
  return { statusCode, headers, body };
}

test("normalizes query parameters defensively", () => {
  const card = normalizeCardQuery({
    name: "<Alice>",
    skills: "React,Node,SuperLongFrameworkNameThatWouldOverflow",
    theme: "unknown",
    width: "2000"
  });

  assert.equal(card.name, "&lt;Alice&gt;");
  assert.equal(card.theme, "indigo");
  assert.equal(card.width, 1200);
  assert.ok(card.skills.every((skill) => skill.length <= 15));
});

test("renders safe cacheable SVG responses", () => {
  const response = invoke({
    name: "<Alice>",
    role: "Full Stack",
    skills: "React,Node,AI,Security,DX",
    theme: "aurora",
    status: "Open & shipping",
    width: "2000"
  });

  assert.equal(response.statusCode, 200);
  assert.equal(response.headers["content-type"], "image/svg+xml;charset=UTF-8");
  assert.equal(response.headers["x-content-type-options"], "nosniff");
  assert.match(response.headers.etag, /^"[a-f0-9]{16}"$/);
  assert.match(response.headers["cache-control"], /no-store/);
  assert.match(response.body, /width="1200"/);
  assert.doesNotMatch(response.body, /<Alice>/);
  assert.match(response.body, /&lt;Alice&gt;/);
  assert.match(response.body, /Open &amp; shipping/);
});

test("supports compact layout and conditional requests", () => {
  assert.match(buildCardSvg({ layout: "compact" }), /height="150"/);

  const compactResponse = invoke({ layout: "compact" });
  const cachedResponse = invoke({ layout: "compact" }, { "if-none-match": compactResponse.headers.etag });

  assert.equal(cachedResponse.statusCode, 304);
  assert.equal(cachedResponse.body, "");
});
