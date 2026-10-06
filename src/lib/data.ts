// Singleton YAML data (site, home, teaching, cv), validated at build time.
// To use TOML instead: `npm i smol-toml`, rename the file, and swap yaml.load for toml.parse.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import yaml from 'js-yaml';
import { z } from 'astro/zod';

const load = <T extends z.ZodTypeAny>(file: string, schema: T): z.infer<T> =>
  schema.parse(yaml.load(readFileSync(resolve('src/data', file), 'utf8')));

const link = z.object({ label: z.string(), href: z.string() });

export const site = load('site.yaml', z.object({
  name: z.string(), email: z.string().email(), description: z.string(),
  links: z.object({ github: z.string().url(), linkedin: z.string().url(), cv: z.string() }),
  page_descriptions: z.record(z.string()),
}));

export const home = load('home.yaml', z.object({
  portrait: z.string(),
  tagline: z.string(),
  description: z.string(),
  options: z.array(z.object({ short: z.string(), long: z.string(), label: z.string(), href: z.string() })),
  history: z.array(z.object({ date: z.coerce.string(), text: z.string(), pub: z.string().optional() })),
}));

export const teaching = load('teaching.yaml', z.object({
  courses: z.array(z.object({
    term: z.enum(['Spring', 'Summer', 'Fall', 'Winter']), year: z.coerce.string(),
    role: z.string(), course: z.string(), place: z.string(), instructor: z.string(),
    lecture_label: z.string().default('Lecture'), lectures: z.string().optional(),
    extra: z.string().optional(), award: z.string().optional(),
  })),
  tools: z.array(z.object({ title: z.string(), summary: z.string().optional(), href: z.string() })).default([]),
}));

const tl = z.object({ year: z.coerce.string(), title: z.string(), place: z.string(), current: z.boolean().optional(), body: z.string().optional() });
const row = z.object({ date: z.coerce.string(), title: z.string(), org: z.string(), note: z.string().optional() });

export const cv = load('cv.yaml', z.object({
  interests: z.array(z.string()),
  education: z.array(tl),
  experience: z.array(tl.extend({ points: z.array(z.object({ with: z.string(), years: z.coerce.string(), text: z.string() })).optional() })),
  service: z.array(row),
  awards: z.array(row),
}));

export { link };
