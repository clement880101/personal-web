#!/usr/bin/env node
/**
 * Pre-deploy sanity checks for the static site.
 * No dependencies — runs on the stock Node available in GitHub Actions.
 *
 *  1. every required file exists
 *  2. every local href/src in the HTML resolves to a real file
 *  3. every in-page #anchor has a matching id
 *  4. each page has a <title> and a meta description
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, resolve, extname } from 'node:path';

const ROOT = resolve(process.cwd());
const BASE_PATH = '/personal-web';           // GitHub Pages project subpath
const errors = [];
const notes = [];

const REQUIRED = [
  'index.html',
  '404.html',
  'assets/css/style.css',
  'assets/js/main.js',
  'assets/img/favicon.svg',
];

for (const f of REQUIRED) {
  if (!existsSync(join(ROOT, f))) errors.push(`missing required file: ${f}`);
}

function htmlFiles(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === '.git' || entry === 'node_modules' || entry === '.github') continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) htmlFiles(full, acc);
    else if (extname(entry) === '.html') acc.push(full);
  }
  return acc;
}

const pages = htmlFiles(ROOT);
if (pages.length === 0) errors.push('no HTML pages found');

for (const page of pages) {
  const rel = page.slice(ROOT.length + 1);
  const html = readFileSync(page, 'utf8');

  if (!/<title>[^<]{3,}<\/title>/i.test(html)) errors.push(`${rel}: missing or empty <title>`);
  if (!/<meta\s+name=["']description["']/i.test(html) && rel !== '404.html') {
    errors.push(`${rel}: missing meta description`);
  }
  if (!/<html[^>]+lang=/i.test(html)) errors.push(`${rel}: <html> has no lang attribute`);

  const ids = new Set([...html.matchAll(/\sid=["']([^"']+)["']/g)].map(m => m[1]));
  const refs = [...html.matchAll(/(?:href|src)=["']([^"']+)["']/g)].map(m => m[1]);

  for (const ref of refs) {
    if (/^(https?:|mailto:|tel:|data:|#$)/.test(ref)) continue;

    if (ref.startsWith('#')) {
      const id = ref.slice(1);
      if (!ids.has(id)) errors.push(`${rel}: anchor ${ref} has no matching id`);
      continue;
    }

    // strip the Pages base path, then resolve absolute vs. relative refs
    let path = ref.split(/[?#]/)[0];
    if (path.startsWith(`${BASE_PATH}/`) || path === BASE_PATH) {
      path = path.slice(BASE_PATH.length);
    }
    if (path.endsWith('/') || path === '') path += 'index.html';

    const target = path.startsWith('/')
      ? join(ROOT, path.slice(1))
      : join(dirname(page), path);

    if (!existsSync(target)) errors.push(`${rel}: ${ref} -> ${target.slice(ROOT.length + 1)} not found`);
  }

  notes.push(`${rel}: ${refs.length} refs, ${ids.size} ids — ok`);
}

// CSS must not reference missing local assets either
const css = readFileSync(join(ROOT, 'assets/css/style.css'), 'utf8')
  // an inlined SVG data URI can itself contain url(#id) and ')' — drop those first
  .replace(/url\(\s*(['"])data:[\s\S]*?\1\s*\)/g, 'url(data:inline)')
  .replace(/url\(\s*data:[^)]*\)/g, 'url(data:inline)');
for (const m of css.matchAll(/url\((['"]?)(?!data:|https?:|#)([^)'"]+)\1\)/g)) {
  const target = resolve(ROOT, 'assets/css', m[2]);
  if (!existsSync(target)) errors.push(`style.css: url(${m[2]}) not found`);
}

console.log(notes.join('\n'));

if (errors.length) {
  console.error(`\n✗ ${errors.length} problem(s):\n` + errors.map(e => `  - ${e}`).join('\n'));
  process.exit(1);
}
console.log(`\n✓ all checks passed (${pages.length} page(s))`);
