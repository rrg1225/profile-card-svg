import assert from "node:assert/strict";
import handler from "../api/card.js";

function invoke(query = {}) {
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

  handler({ query }, res);
  return { statusCode, headers, body };
}

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
assert.match(response.headers["cache-control"], /no-store/);
assert.match(response.body, /width="1200"/);
assert.doesNotMatch(response.body, /<Alice>/);
assert.match(response.body, /&lt;Alice&gt;/);
assert.match(response.body, /Open &amp; shipping/);

const longTextResponse = invoke({
  name: "A".repeat(80),
  skills: "SuperLongFrameworkNameThatWouldOverflow"
});
assert.match(longTextResponse.body, /…/);
assert.doesNotMatch(longTextResponse.body, /SuperLongFrameworkNameThatWouldOverflow/);

const compactResponse = invoke({ layout: "compact" });
assert.match(compactResponse.body, /height="150"/);

console.log("profile-card-svg smoke test passed");
