// The BibTeX record shown on /publications, rebuilt from the parsed fields so site-only
// fields (pubtype, highlight, pdf…) never leak into what a reader copies.
import type { Publication } from './collections';

export type BibField = { key: string; value: string; role?: 'authors' | 'venue' | 'doi' };

export const PAD = 9;

export function bibFields(p: Publication['data']): BibField[] {
  const f: BibField[] = [
    { key: 'title', value: p.title },
    { key: 'author', value: p.authors.join(' and '), role: 'authors' },
    { key: p.venueField, value: p.venue, role: 'venue' },
  ];
  if (p.series) f.push({ key: 'series', value: p.series });
  f.push({ key: 'year', value: String(p.year) });
  if (p.doi) f.push({ key: 'doi', value: p.doi, role: 'doi' });
  return f;
}

/** Exactly the text the copy button puts on the clipboard. */
export function bibText(key: string, p: Publication['data']): string {
  const lines = bibFields(p).map(({ key: k, value }) => '  ' + k.padEnd(PAD) + ' = {' + value + '}');
  return `@${p.entryType}{${key},\n${lines.join(',\n')}\n}`;
}
