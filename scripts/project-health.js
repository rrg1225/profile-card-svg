import { existsSync, readdirSync, readFileSync } from "node:fs";

const problems = [];
for (const file of ["README.md", "package.json", "api/card.js", ".github/workflows/ci.yml"]) {
  if (!existsSync(file)) problems.push(`missing ${file}`);
}

const pkg = JSON.parse(readFileSync("package.json", "utf8"));
for (const script of ["check", "test"]) {
  if (!pkg.scripts?.[script]) problems.push(`missing npm script: ${script}`);
}

const readme = readFileSync("README.md", "utf8");
for (const section of ["Features", "Usage", "Quality Gates", "Roadmap"]) {
  if (!readme.includes(section)) problems.push(`README missing section: ${section}`);
}

const tests = existsSync("test") ? readdirSync("test").filter((file) => file.endsWith(".test.js")) : [];
if (tests.length === 0) problems.push("missing test coverage");

if (problems.length) {
  console.error(problems.map((item) => `[health] ${item}`).join("\n"));
  process.exit(1);
}

console.log(`[health] ${pkg.name} repository checks passed`);
