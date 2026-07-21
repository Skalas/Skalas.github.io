import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { load } from 'js-yaml';

const projectRoot = resolve(import.meta.dirname, '../..');
const sourceDirectory = resolve(projectRoot, 'src/content/recipes');
const outputDirectory = resolve(projectRoot, 'analysis/data');
const frontmatterPattern = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;

await mkdir(outputDirectory, { recursive: true });
const files = (await readdir(sourceDirectory)).filter((file) => file.endsWith('.md')).sort();
const recipes = [];

for (const file of files) {
  const text = await readFile(resolve(sourceDirectory, file), 'utf8');
  const match = text.match(frontmatterPattern);
  if (!match) throw new Error(`${file}: missing frontmatter`);
  const metadata = load(match[1]);
  recipes.push({
    id: metadata.brainId,
    file,
    source_path: `src/content/recipes/${file}`,
    metadata,
    body: match[2].trim(),
  });
}

await writeFile(
  resolve(outputDirectory, 'recipes.json'),
  `${JSON.stringify({ generated_at: new Date().toISOString(), recipes }, null, 2)}\n`,
  'utf8',
);
await writeFile(
  resolve(outputDirectory, 'README.md'),
  `# Analysis data manifest\n\n- Source: \`src/content/recipes/*.md\`\n- Translation: \`analysis/scripts/00_translate_recipes.mjs\`\n- Output: \`analysis/data/recipes.json\`\n- Records: ${recipes.length}\n- Encoding: UTF-8\n`,
  'utf8',
);

console.log(`Translated ${recipes.length} recipe notes to analysis/data/recipes.json`);
