const fs = require("fs");
const path = require("path");

const input = path.resolve(__dirname, "./src/api/models/data-contracts.ts");
const outputDir = path.resolve(__dirname, "./src/api/models");

const content = fs.readFileSync(input, "utf-8");

const blocks = content.split(/(?=export (?:interface|enum|type) )/g).filter(b => b.trim());

const indexExports = [];

blocks.forEach(block => {
  const match = block.match(/^export (?:interface|enum|type) (\w+)/);
  if (!match) return;

  const name = match[1];
  const fileName = name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

  const deps = [];
  const refMatches = block.matchAll(/:\s*(\w+)[\s;[\]|,<)]/g);
  for (const ref of refMatches) {
    const dep = ref[1];
    if (dep !== name && blocks.some(b => new RegExp(`^export (?:interface|enum|type) ${dep}\\b`).test(b))) {
      if (!deps.includes(dep)) deps.push(dep);
    }
  }

  const imports = deps.map(d => {
    const depFile = d.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    return `import { ${d} } from './${depFile}';`;
  }).join("\n");

  const fileContent = (imports ? imports + "\n\n" : "") + block.trim() + "\n";

  fs.writeFileSync(path.join(outputDir, `${fileName}.ts`), fileContent);
  indexExports.push(`export { ${name} } from './${fileName}';`);
});

fs.writeFileSync(path.join(outputDir, "index.ts"), indexExports.join("\n") + "\n");

fs.unlinkSync(input);

console.log(`Разбито на ${indexExports.length} файлов`);
