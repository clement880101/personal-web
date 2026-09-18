# clement880101.github.io/personal-web

Personal site for **Clement Chang** — reliability engineer, agent-first.

Hand-written static HTML/CSS/JS. No framework, no build step, no dependencies.
Deployed to GitHub Pages by GitHub Actions on every push to `main`.

**<https://clement880101.github.io/personal-web/>**

## Layout

```
index.html              the whole site (single page)
404.html                not-found page
assets/css/style.css    all styling
assets/js/main.js       scroll reveals, counters, nav state — progressive, nothing required
assets/img/favicon.svg
scripts/check.mjs       pre-deploy validation, no dependencies
sitemap.xml             one entry; lastmod is stamped at deploy time
.github/workflows/deploy.yml
```

## Local preview

Anything that serves a directory works:

```sh
python3 -m http.server 4319
```

Then open <http://localhost:4319>.

## Checks

`scripts/check.mjs` runs on every push and pull request. It verifies that

- required files exist,
- every local `href`/`src` resolves to a real file,
- every `#anchor` has a matching `id`,
- each page has a `<title>`, a meta description and a `lang` attribute,
- `url()` references in the CSS point at real assets,
- `sitemap.xml` parses, and every `<loc>` is an absolute URL inside this site.

```sh
node scripts/check.mjs
```

The workflow also pings external links and reports unreachable ones as warnings —
a dead third-party link should not block a deploy.

## Editing

Content lives directly in `index.html`; there is no data file or templating layer.
Colors, fonts and spacing are CSS custom properties at the top of `style.css`.

## Sitemap

`sitemap.xml` holds a single entry for the homepage; the anchors on it are not
separate URLs. The workflow rewrites `<lastmod>` to the commit date on each
deploy, so it cannot drift.

There is no `robots.txt`. This is a project page, so it is served under
`/personal-web/`, and crawlers only read `robots.txt` from the host root
(`clement880101.github.io/robots.txt`), which belongs to a user-page repo that
does not exist. A `robots.txt` committed here would simply be ignored. Submit
the sitemap directly in Google Search Console instead.

## Custom domain

Add a `CNAME` file containing the domain, point DNS at GitHub Pages, and update
`BASE_PATH` in `scripts/check.mjs` plus the absolute paths in `404.html`.

## License

Code is MIT. Written content and résumé material are © Clement Chang.
