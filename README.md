# Akoha: NCEA revision notes (foundation)

The website homepage lists the available revision notes by subject, level, standard and topic. Each note has its own shareable page with worked examples, interactive diagrams and previous/next links.

## Run locally

```sh
npm install
npm run dev
```

## Production

```sh
npm run build
npm start
```

## Deploy to GitHub Pages

The GitHub Actions workflow in `.github/workflows/deploy.yml` exports the site as static files. The build creates `out/index.html` and static HTML for each note; you do not need to write or maintain an `index.html` yourself.

1. Push this repository to GitHub on the `main` or `master` branch.
2. In the repository, open **Settings → Pages** and set the build and deployment source to **GitHub Actions**.
3. Open the **Actions** tab and wait for the “Deploy to GitHub Pages” workflow to finish. The workflow also supports manual runs.

For a project site, GitHub Pages serves the website under `https://<owner>.github.io/<repository>/`; the workflow configures that repository path for generated links and assets. If you use a custom domain or a user/organization site at `https://<owner>.github.io/`, set the workflow's `NEXT_PUBLIC_BASE_PATH` to an empty value before deploying.

Checks: `npm run typecheck && npm run lint && npm test`.
Env vars: none yet (auth and database are not wired up).

## Add content
- **Page:** add `content/<subject>/<level>/<standard>/<group>/<slug>.mdx` with the frontmatter fields shown in the SHM seed note (subject, level, as, standardSlug, standardTitle, groupSlug, group, slug, title, description, order).
- **Subject / standard / topic group:** derived from page frontmatter, so a new value in a page creates it.
- **Glossary term:** add a key to `content/glossary.json`, then use `<Term t="key">word</Term>` in a note.
