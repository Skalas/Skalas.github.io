import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { basename, join } from 'node:path';
import { dump, load } from 'js-yaml';

const vaultRoot = process.env.VAULT_PATH ?? join(homedir(), 'Documents', 'Obsidian Vault');
const sourceDirectory = join(vaultRoot, 'library', 'recipes');
const targetDirectory = new URL('../src/content/recipes/', import.meta.url);

const frontmatterPattern = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
const markdownLinkPattern = /\[([^\]]+)]\([^)]+\)/g;
const formattingPattern = /[*_`>#]/g;

function firstMatch(body, patterns) {
  for (const pattern of patterns) {
    const match = body.match(pattern);
    if (match?.[1]) return match[1].trim();
  }
  return undefined;
}

function plainText(value) {
  return value
    .replace(markdownLinkPattern, '$1')
    .replace(formattingPattern, '')
    .replace(/\[\[([^\]|]+)(?:\|[^\]]+)?]]/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractDescription(body) {
  const section = body.match(
    /##\s+(?:Description|Descripción)\s*\n+([\s\S]*?)(?=\n##\s|$)/i,
  )?.[1];
  const candidates = (section ?? body)
    .split(/\n\s*\n/)
    .map(plainText)
    .filter(
      (paragraph) =>
        paragraph.length > 35 &&
        !/^(?:Creator|Original Creator|Source|Fuente|Link):/i.test(paragraph),
    );
  return candidates[0]?.slice(0, 220) ?? 'A recipe from my personal kitchen notebook.';
}

function creatorProfileUrl(creator, source) {
  if (!creator || !/instagram/i.test(source ?? '')) return undefined;
  const handle = creator.match(/@([\w.]+)/)?.[1];
  return handle ? `https://www.instagram.com/${handle}/` : undefined;
}

function normalizeRecipe(fileName, source) {
  const frontmatter = source.match(frontmatterPattern);
  if (!frontmatter) throw new Error(`${fileName}: missing YAML frontmatter`);

  const original = load(frontmatter[1]) ?? {};
  const body = source
    .slice(frontmatter[0].length)
    .replace(/^\s*#\s+.+\r?\n+/, '')
    .replace(
      /^(?:(?:Original Creator|Creator|Source|Fuente|Link|Enlace):[^\n]*(?:\r?\n\s*)*)+/i,
      '',
    );
  const title =
    original.title ??
    original.aliases?.[0] ??
    firstMatch(source.slice(frontmatter[0].length), [/^#\s+(.+)$/m]);

  if (!title) throw new Error(`${fileName}: could not determine a title`);

  const sourceName =
    original.source ?? firstMatch(body, [/^(?:Source|Fuente):\s*(.+)$/im]);
  const creator =
    original.creator ??
    firstMatch(body, [/^(?:Original Creator|Creator):\s*(.+)$/im, /\bby\s+(@[\w.]+)/i]);
  const directUrl =
    original.link ?? firstMatch(body, [/^(?:Link|Enlace):\s*(https?:\/\/\S+)/im]);
  const originUrl = directUrl || creatorProfileUrl(creator, sourceName);
  const tags = [...new Set([...(original.tags ?? []), ...(original.links ?? [])])]
    .filter((tag) => tag !== 'recipe')
    .map(String);

  const data = {
    title: plainText(String(title)),
    description: extractDescription(body),
    created: original.created,
    updated: original.updated,
    tags,
    source: sourceName ? plainText(String(sourceName)) : undefined,
    creator: creator ? plainText(String(creator)) : undefined,
    originUrl,
    originType: directUrl ? 'recipe' : originUrl ? 'creator' : undefined,
    servings: original.servings,
    totalTime: original.total_time,
    calories: original.calories,
    protein: original.protein,
    carbs: original.carbs,
    fat: original.fat,
    nutritionBasis: original.nutrition_basis,
    nutritionScope: original.nutrition_scope,
    nutritionNote: original.nutrition_note,
    brainId: original.id ?? basename(fileName, '.md'),
  };

  return `---\n${dump(data, { noRefs: true, lineWidth: 100, sortKeys: false }).trim()}\n---\n\n${body.trim()}\n`;
}

await mkdir(targetDirectory, { recursive: true });
const files = (await readdir(sourceDirectory)).filter((file) => file.endsWith('.md')).sort();

for (const fileName of files) {
  const source = await readFile(join(sourceDirectory, fileName), 'utf8');
  const normalized = normalizeRecipe(fileName, source);
  await writeFile(new URL(fileName, targetDirectory), normalized, 'utf8');
}

console.log(`Synced ${files.length} recipes from ${sourceDirectory}`);
