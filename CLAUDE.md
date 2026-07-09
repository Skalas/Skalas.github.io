# Content conventions

## Post `date` frontmatter

The `date` field in a post's frontmatter must reflect the day the post actually
went live (the commit that flips `draft: true` → `draft: false`), not the day
it was drafted or first written.

Posts often get drafted, held, or unpublished/republished before they ship.
When flipping `draft` to `false`, update `date` in the same commit to match
that day — don't leave it at the original drafting date.
