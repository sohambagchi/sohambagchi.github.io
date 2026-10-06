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

const WPM = 230;
export const readingMinutes = (body: string) => Math.max(1, Math.round(body.trim().split(/\s+/).filter(Boolean).length / WPM));

/** "2026–present", "2024–2025", "2023" */
export function years(start: number, end?: number | 'present'): string {
  if (end === 'present') return `${start}–present`;
  if (end == null || end === start) return String(start);
  return `${start}–${end}`;
}

export const pad2 = (n: number) => String(n).padStart(2, '0');
