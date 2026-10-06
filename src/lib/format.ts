const fmt = (opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', ...opts });

const LONG = fmt({ day: 'numeric', month: 'long', year: 'numeric' });
const MONTH_YEAR = fmt({ month: 'long', year: 'numeric' });

/** "5 October 2026" */
export const dateLong = (d: Date) => LONG.format(d);
/** "October 2026" */
export const monthYear = (d: Date) => MONTH_YEAR.format(d);
// Fixed list rather than Intl: en-GB abbreviates September as "Sept", which breaks the mono column.
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/** "Oct 2026" */
export const monthShort = (d: Date) => `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;

const MONTH_RE = /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i;
/** A bib `month` or a date label: "jun", "September", "6", "Apr 2026" → 1-12. Undated → undefined. */
export function monthNumber(value: string): number | undefined {
  const s = value.trim();
  if (/^\d{1,2}$/.test(s)) return Number(s) >= 1 && Number(s) <= 12 ? Number(s) : undefined;
  const m = MONTH_RE.exec(s);
  return m ? MONTHS.findIndex((x) => x.toLowerCase() === m[1].toLowerCase()) + 1 : undefined;
}

/** Newest-first sort key for a hand-written label ("Apr 2026", "2026"). A bare year sorts
    below every dated month in the same year; no year at all sorts last. */
export const dateSortKey = (label: string): number => {
  const year = /\b(\d{4})\b/.exec(label);
  return year ? Number(year[1]) * 100 + (monthNumber(label) ?? 0) : 0;
};

const WPM = 230;
export const readingMinutes = (body: string) => Math.max(1, Math.round(body.trim().split(/\s+/).filter(Boolean).length / WPM));

/** "2026–present", "2024–2025", "2023" */
export function years(start: number, end?: number | 'present'): string {
  if (end === 'present') return `${start}–present`;
  if (end == null || end === start) return String(start);
  return `${start}–${end}`;
}

export const pad2 = (n: number) => String(n).padStart(2, '0');
