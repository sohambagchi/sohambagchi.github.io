// Build-time Lucide icons. The SVGs in src/icons/ carry a C2PA <metadata> blob that makes each
// file ~8 KB; it is stripped here so only the paths reach the page.
const raw = import.meta.glob<string>('../icons/*.svg', { query: '?raw', import: 'default', eager: true });

const files: Record<string, string> = {};
for (const [path, src] of Object.entries(raw)) files[path.split('/').pop()!.replace(/\.svg$/, '')] = src;

const cache = new Map<string, string>();

/** Inline <svg> for a Lucide icon name, sized by its container (width/height 100%). */
export function iconSvg(name: string, strokeWidth: number | string = 1.75): string {
  const ck = name + '|' + strokeWidth;
  const hit = cache.get(ck);
  if (hit != null) return hit;
  const src = files[name];
  if (src == null) throw new Error(`icon: "${name}" is not in src/icons/. Available: ${Object.keys(files).sort().join(', ')}`);
  const out = src
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<metadata>[\s\S]*?<\/metadata>/g, '')
    .replace(/\s+xmlns:c2pa="[^"]*"/g, '')
    .replace(/stroke-width="[^"]*"/, `stroke-width="${strokeWidth}"`)
    .replace(/width="24"/, 'width="100%"')
    .replace(/height="24"/, 'height="100%"')
    .trim();
  cache.set(ck, out);
  return out;
}

/** The full <span class="ln-icon"> wrapper, matching Sobar's Icon component. */
export function iconHtml(
  name: string,
  { size = 18, strokeWidth = 1.75, label, className = '' }:
    { size?: number | string; strokeWidth?: number | string; label?: string; className?: string } = {},
): string {
  const px = typeof size === 'number' ? size + 'px' : size;
  const a11y = label ? ` role="img" aria-label="${label}"` : ' aria-hidden="true"';
  return `<span class="ln-icon${className ? ' ' + className : ''}" style="width:${px};height:${px}"${a11y}>${iconSvg(name, strokeWidth)}</span>`;
}

export const iconNames = Object.keys(files).sort();
