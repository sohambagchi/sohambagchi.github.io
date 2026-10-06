import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { bibLoader } from './lib/bib';

const md = (dir: string) => glob({ pattern: '**/[^_]*.md', base: './src/content/' + dir });
const year = z.number().int().min(1990).max(2100);

const publications = defineCollection({
  loader: bibLoader('./src/content/publications.bib'),
  schema: z.object({
    entryType: z.string(),
    kind: z.enum(['conference', 'workshop', 'journal', 'thesis', 'preprint']),
    title: z.string(),
    authors: z.array(z.string()).min(1),
    venueField: z.enum(['booktitle', 'journal', 'school', 'howpublished']),
    venue: z.string(),
    series: z.string().optional(),
    address: z.string().optional(),
    year,
    month: z.number().int().min(1).max(12).optional(),
    doi: z.string().optional(),
    highlight: z.string().optional(),
    links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
  }),
});

const projects = defineCollection({
  loader: md('projects'),
  schema: z.object({
    title: z.string(),
    kind: z.enum(['Research', 'Software', 'Teaching tool']).default('Research'),
    start: year,
    end: z.union([year, z.literal('present')]).optional(),
    summary: z.string().max(240),
    stack: z.array(z.string()).default([]),
    publications: z.array(reference('publications')).default([]),
    links: z.array(z.object({ label: z.string(), href: z.string().url() })).default([]),
    order: z.number().optional(),
    draft: z.boolean().default(false),
  }),
});

const blog = defineCollection({
  loader: md('blog'),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional().nullable(),
    summary: z.string().max(240),
    tags: z.array(z.string()).default([]),
    projects: z.array(reference('projects')).default([]),
    publications: z.array(reference('publications')).default([]),
    draft: z.boolean().default(false),
  }),
});

const creative = defineCollection({
  loader: md('creative'),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.coerce.date(),
    medium: z.string(),
    summary: z.string().max(240),
    cover: image().optional(),
    cover_caption: z.string().optional(),
    links: z.array(z.object({ label: z.string(), href: z.string().url() })).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { publications, projects, blog, creative };
