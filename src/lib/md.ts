// Inline Markdown for the YAML strings (taglines, history entries, descriptions).
// Links get Sobar's .ln-link treatment; absolute http(s) links open in a new tab with the ↗ mark.
import { marked } from 'marked';
import { iconHtml } from './icons';

const EXT = `<span class="ln-link__ext">${iconHtml('arrow-up-right', { size: '0.9em' })}</span>`;

// marked dropped smartypants, and the voice rules want proper marks everywhere, so apply them
// here. Only text runs are touched — never tag innards — so hrefs survive intact.
const marks = (text: string) =>
  text
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/---/g, '—')
    .replace(/(^|[^-])--([^-]|$)/g, '$1–$2')
    .replace(/\.\.\./g, '…')
    .replace(/(\w)'(\w)/g, '$1’$2')
    .replace(/(^|[\s(\[{“‘—–])"/g, '$1“')
    .replace(/"/g, '”')
    .replace(/(^|[\s(\[{“—–])'/g, '$1‘')
    .replace(/'/g, '’');

const smarten = (html: string) =>
  html
    .split(/(<[^>]*>)/)
    .map((part, i) => (i % 2 === 1 ? part : marks(part)))
    .join('');

export function inlineMd(src: string): string {
  const html = marked.parseInline(src, { async: false });
  const linked = html.replace(/<a href="([^"]*)"([^>]*)>([\s\S]*?)<\/a>/g, (_m, href: string, attrs: string, text: string) => {
    const ext = /^https?:\/\//i.test(href);
    const rel = ext ? ' target="_blank" rel="noopener noreferrer"' : '';
    return `<a class="ln-link" href="${href}"${rel}${attrs}>${text}${ext ? EXT : ''}</a>`;
  });
  return smarten(linked);
}
