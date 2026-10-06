// Collection access in one place, so every page, the header counts and RSS agree.
import { getCollection, type CollectionEntry } from 'astro:content';
import { teaching } from './data';

/** Drafts build in `astro dev` and are dropped from production. */
const live = (e: { data: { draft?: boolean } }) => (import.meta.env.PROD ? !e.data.draft : true);

// One read per collection per production build; never cached in dev, so edits stay live.
function once<T>(load: () => Promise<T>): () => Promise<T> {
  let pending: Promise<T> | null = null;
  return () => (import.meta.env.PROD ? (pending ??= load()) : load());
}

export type Publication = CollectionEntry<'publications'>;
export type Project = CollectionEntry<'projects'>;
export type Post = CollectionEntry<'blog'>;
export type Creative = CollectionEntry<'creative'>;

/** Newest first: year descending, then the bib `month` descending. Entries with no month sort
    below the dated ones in their year; the sort is stable, so those keep publications.bib order. */
export const getPublications = once(async (): Promise<Publication[]> =>
  (await getCollection('publications')).sort(
    (a, b) => b.data.year - a.data.year || (b.data.month ?? 0) - (a.data.month ?? 0)));

/** Explicit `order` wins; otherwise ongoing first, then end descending, then start descending. */
export const getProjects = once(async (): Promise<Project[]> => {
  const ongoing = (p: Project) => (p.data.end === 'present' ? 1 : 0);
  const ended = (p: Project) => (typeof p.data.end === 'number' ? p.data.end : 0);
  return (await getCollection('projects')).filter(live).sort((a, b) => {
    const [x, y] = [a.data.order, b.data.order];
    if (x != null && y != null) return x - y;
    if (x != null) return -1;
    if (y != null) return 1;
    return ongoing(b) - ongoing(a) || ended(b) - ended(a) || b.data.start - a.data.start;
  });
});

/** Newest first. */
export const getPosts = once(async (): Promise<Post[]> =>
  (await getCollection('blog')).filter(live).sort((a, b) => b.data.date.getTime() - a.data.date.getTime()));

export const getCreative = once(async (): Promise<Creative[]> =>
  (await getCollection('creative')).filter(live).sort((a, b) => b.data.date.getTime() - a.data.date.getTime()));

export type Section = 'home' | 'publications' | 'teaching' | 'projects' | 'creative' | 'blog' | 'cv';

export const SECTION_TITLES: Record<Exclude<Section, 'home'>, string> = {
  publications: 'Publications',
  teaching: 'Teaching',
  projects: 'Projects',
  creative: 'Creative',
  blog: 'Blog',
  cv: 'CV',
};

/** Header nav: section name + how many things are in it, counted from the content at build time. */
export async function navItems(): Promise<{ key: Section; label: string; count: number; href: string }[]> {
  const [pubs, projects, posts, creative] = await Promise.all([getPublications(), getProjects(), getPosts(), getCreative()]);
  const counts: [Section, string, number][] = [
    ['home', 'bagchi', 1],
    ['publications', 'publications', pubs.length],
    ['teaching', 'teaching', teaching.courses.length],
    ['projects', 'projects', projects.length],
    ['creative', 'creative', creative.length],
    ['blog', 'blog', posts.length],
  ];
  return counts.map(([key, label, count]) => ({ key, label, count, href: key === 'home' ? '/' : '/' + key }));
}
