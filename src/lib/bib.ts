// Minimal BibTeX reader + Astro content loader. Handles {…} and "…" values, nested braces,
// "Last, First" and "First Last" names, -- / --- dashes. No @string macros or LaTeX accents —
// write UTF-8. Swap for @retorquere/bibtex-parser if the .bib ever needs more.
import type { Loader } from 'astro/loaders';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { monthNumber } from './format';

type Raw = { key: string; type: string; fields: Record<string, string> };

export function parseBib(src: string): Raw[] {
  src = src.replace(/^\s*%.*$/gm, '');
  const out: Raw[] = [];
  let i = 0;
  while ((i = src.indexOf('@', i)) !== -1) {
    const head = /^@(\w+)\s*\{\s*([^,\s]+)\s*,/.exec(src.slice(i));
    if (!head || /^(comment|string|preamble)$/i.test(head[1])) { i++; continue; }
    i += head[0].length;
    const fields: Record<string, string> = {};
    for (;;) {
      while (i < src.length && /[\s,]/.test(src[i])) i++;
      if (i >= src.length) throw new Error('bib: unterminated entry ' + head[2]);
      if (src[i] === '}') { i++; break; }
      const name = /^([\w-]+)\s*=\s*/.exec(src.slice(i));
      if (!name) throw new Error(`bib: bad field in ${head[2]} near "${src.slice(i, i + 30)}"`);
      i += name[0].length;
      let v: string;
      if (src[i] === '{') {
        const s = i; let d = 0;
        do { if (src[i] === '{') d++; else if (src[i] === '}') d--; i++; } while (d > 0 && i < src.length);
        v = src.slice(s + 1, i - 1);
      } else if (src[i] === '"') {
        const s = ++i; while (i < src.length && src[i] !== '"') i++; v = src.slice(s, i++);
      } else {
        v = /^[^,}\s]+/.exec(src.slice(i))![0]; i += v.length;
      }
      fields[name[1].toLowerCase()] = v.replace(/[{}]/g, '').replace(/\s+/g, ' ').replace(/---/g, '—').replace(/--/g, '–').trim();
    }
    out.push({ key: head[2], type: head[1].toLowerCase(), fields });
  }
  return out;
}

const name = (n: string) => { const [last, first] = n.split(/\s*,\s*/); return first ? first + ' ' + last : n.trim(); };
const VENUE = ['booktitle', 'journal', 'school', 'howpublished'] as const;
const KIND: Record<string, string> = { inproceedings: 'conference', article: 'journal', phdthesis: 'thesis', mastersthesis: 'thesis', misc: 'preprint' };
const LINKS: [string, string][] = [['pdf', 'PDF'], ['slides', 'Slides'], ['code', 'Code'], ['video', 'Video'], ['url', 'Link']];

export function toPublication({ type, fields: f }: Raw) {
  const venueField = VENUE.find(k => f[k]) ?? 'howpublished';
  return {
    entryType: type,
    kind: f.pubtype ?? KIND[type] ?? 'preprint',
    title: f.title,
    authors: (f.author ?? '').split(/\s+and\s+/).map(name).filter(Boolean),
    venueField, venue: f[venueField] ?? '',
    series: f.series, address: f.address,
    year: Number(f.year),
    month: f.month ? monthNumber(f.month) : undefined,
    doi: f.doi, highlight: f.highlight,
    links: LINKS.filter(([k]) => f[k]).map(([k, label]) => ({ label, href: f[k] })),
  };
}

export function bibLoader(path: string): Loader {
  const abs = resolve(path);
  return {
    name: 'bib-loader',
    load: async ({ store, parseData, watcher, logger }) => {
      const sync = async () => {
        const entries = parseBib(await readFile(abs, 'utf8'));
        store.clear();
        for (const e of entries) store.set({ id: e.key, data: await parseData({ id: e.key, data: toPublication(e) }) });
        logger.info(entries.length + ' publications');
      };
      await sync();
      watcher?.add(abs);
      watcher?.on('change', p => { if (resolve(p) === abs) sync(); });
    },
  };
}
