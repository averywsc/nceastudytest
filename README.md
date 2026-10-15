# Akoha: NCEA revision notes (foundation)
Setup: `npm install && npm run dev`. Checks: `npm run typecheck && npm run lint && npm test`.
Env vars: none yet (auth and database are not wired up).

## Add content
- **Page:** add `content/<subject>/<level>/<standard>/<group>/<slug>.mdx` with the frontmatter fields shown in the SHM seed note (subject, level, as, standardSlug, standardTitle, groupSlug, group, slug, title, description, order).
- **Subject / standard / topic group:** derived from page frontmatter, so a new value in a page creates it.
- **Glossary term:** add a key to `content/glossary.json`, then use `<Term t="key">word</Term>` in a note.
