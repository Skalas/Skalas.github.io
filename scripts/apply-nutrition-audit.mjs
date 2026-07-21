import { readFile, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { dump, load } from 'js-yaml';

const dryRun = process.argv.includes('--dry-run');
const vaultRoot = process.env.VAULT_PATH ?? join(homedir(), 'Documents', 'Obsidian Vault');
const recipesDirectory = join(vaultRoot, 'library', 'recipes');
const auditPath = new URL('../analysis/outputs/nutrition_audit.json', import.meta.url);
const frontmatterPattern = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
const audit = JSON.parse(await readFile(auditPath, 'utf8'));
const applicable = audit.filter((record) => record.safe_to_apply && record.proposed_metadata);

for (const record of applicable) {
  const path = join(recipesDirectory, record.file);
  const source = await readFile(path, 'utf8');
  const match = source.match(frontmatterPattern);
  if (!match) throw new Error(`${record.file}: missing YAML frontmatter`);

  const metadata = load(match[1]) ?? {};
  Object.assign(metadata, record.proposed_metadata, {
    updated: '2026-07-21',
    nutrition_basis: record.basis,
    nutrition_scope: record.source_provided_body.serving_basis,
    nutrition_note:
      record.basis === 'source_provided_approximate'
        ? 'Approximate values reported by the original recipe; not independently verified.'
        : 'Values reported by the original recipe; not independently verified.',
  });

  const updated = `---\n${dump(metadata, { noRefs: true, lineWidth: 100, sortKeys: false }).trim()}\n---\n\n${source.slice(match[0].length).trim()}\n`;
  if (!dryRun) await writeFile(path, updated, 'utf8');
  console.log(`${dryRun ? 'Would update' : 'Updated'} ${record.file}`);
}

console.log(`${dryRun ? 'Validated' : 'Applied'} ${applicable.length} nutrition records.`);
