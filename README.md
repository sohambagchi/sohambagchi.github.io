# sohambagchi.github.io

Personal academic site for Soham Bagchi, built on the **Sobar** design system. Astro 5, static
output, no server. Content lives in YAML, BibTeX and Markdown files, so adding a paper, a post or
a course means editing one file.

The previous Jekyll (al-folio) site is archived on the [`v1`](../../tree/v1) branch.

## Running it

The repo ships a nix flake with the toolchain (bun, plus node as a fallback for editor tooling):

```sh
nix develop          # or: direnv allow, which uses the same flake
bun install
bun run dev          # http://localhost:4321
bun run build        # astro check && astro build → dist/
bun run preview      # serve dist/
```

Without nix, any bun ≥ 1.2 works. `bun run build` runs `astro check` first, so a bad frontmatter
field, an unknown BibTeX key or a missing icon fails the build rather than shipping broken.

## Where the content is

| What | File |
|---|---|
| Site name, email, links, per-page `<meta>` descriptions | `src/data/site.yaml` |
| Homepage: tagline, description, options, history | `src/data/home.yaml` |
| Courses and teaching tools | `src/data/teaching.yaml` |
| CV: interests, education, experience, service, awards | `src/data/cv.yaml` |
| Publications (the only source — also feeds the CV and every paper link) | `src/content/publications.bib` |
| Projects | `src/content/projects/*.md` |
| Blog posts | `src/content/blog/*.md` |
| Creative entries | `src/content/creative/*.md` |

Each Markdown directory has a `_template.md` documenting its frontmatter. Files whose names start
with `_` are ignored, and the filename is the URL: `src/content/blog/hello.md` → `/blog/hello`.
`draft: true` entries show in `bun run dev` and are left out of production builds.

### Adding things

- **A paper:** append an entry to `publications.bib`. The key is its permanent URL
  (`/publications#<key>`) — don't rename it once published. `pubtype`, `highlight`, `pdf`, `slides`,
  `code`, `video` and `url` are site-only fields and never appear in the BibTeX a reader copies.
- **A post:** `cp src/content/blog/_template.md src/content/blog/<slug>.md`, set `draft: false`.
  It appears in the index, in RSS and in the header's `blog(n)` count with no code changes.
  Footnotes become margin notes in the right rail.
- **A project or creative entry:** same, from the matching `_template.md`.

## Structure

```
src/
  pages/              one file per route; [slug].astro for detail pages
  layouts/Base.astro  <head>, stylesheet order, chrome, theme script
  components/site/    this site's pieces (header, footer, bib record, …)
  components/sobar/   Sobar design-system source — treat as vendored, don't edit
  styles/             Sobar tokens + components.css, then site.css
  lib/                content access, BibTeX rendering, icons, formatting
  icons/              Lucide 0.460.0 SVGs, inlined at build time
  plugins/            rehype step that turns GFM footnotes into margin notes
public/               served as-is at the site root
```

Sobar's React components render **at build time** — there are no `client:` directives and no React
in the browser. The three bits of client JavaScript are plain scripts: the theme toggle, the
header's scrolled border, and the BibTeX copy button with its toast. Everything else is CSS.

## Deploying

`.github/workflows/deploy.yml` builds on every push to `master` and publishes with
`actions/deploy-pages`. **Settings → Pages → Source must be set to "GitHub Actions"** — the old
site deployed from the `gh-pages` branch, which this workflow does not use.

## Still to supply

- `public/portrait.jpg` — until then the homepage shows an "SB" monogram.
- `public/soham-bagchi-cv.pdf` — the target of the CV download button and the `--cv` option.
- A favicon. The design has no logo (the name set in type is the mark), so this is a deliberate gap
  rather than an oversight.
