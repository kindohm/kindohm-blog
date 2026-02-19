const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const slugify = (str) =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

rl.question("Title: ", (title) => {
  rl.close();

  const date = new Date().toISOString().split("T")[0];
  const dir = path.join("posts", `${date}-${slugify(title)}`);

  fs.mkdirSync(dir, { recursive: true });

  const content = `---\ntitle: ${title}\ndraft: true\n---\n`;
  fs.writeFileSync(path.join(dir, "index.md"), content);

  console.log(`Created: ${path.join(dir, "index.md")}`);
});
