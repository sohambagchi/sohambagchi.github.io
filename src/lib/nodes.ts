// Sobar's Timeline and IndexRow take ReactNodes for their rich slots. Building them with
// createElement keeps the design-system components as the single source of the markup,
// instead of re-implementing their DOM in .astro files.
import { createElement as h, Fragment, type ReactNode } from 'react';
import { Badge } from '../components/sobar/display/Badge.jsx';
import { Link } from '../components/sobar/core/Link.jsx';
import { teaching } from './data';
import type { Publication } from './collections';

export type TimelineItem = { year: ReactNode; title: ReactNode; place?: ReactNode; body?: ReactNode; current?: boolean };

/** The same items on /teaching and in the Teaching section of /cv. */
export function teachingItems(): TimelineItem[] {
  return teaching.courses.map((c) => ({
    year: h(Fragment, null, c.term, h('br'), c.year),
    title: c.course,
    place: `${c.role} · ${c.place}`,
    body: h(
      Fragment,
      null,
      `Instructor: ${c.instructor}.`,
      c.lectures ? ` ${c.lecture_label}: ${c.lectures}.` : null,
      c.extra ? ` ${c.extra}` : null,
      c.links.length > 0
        ? h('span', { className: 'tl-links' }, c.links.map((l) => h(Link, { key: l.href, href: l.href, external: true }, l.label)))
        : null,
      c.award ? h('span', { className: 'award' }, h(Badge, null, c.award)) : null,
    ),
  }));
}

/** The index column of a "Related" publication row: series over city. */
export function pubRowIndex(pub: Publication): ReactNode {
  return h(
    Fragment,
    null,
    h('span', { className: 'relrow__v' }, pub.data.series ?? pub.data.venue),
    pub.data.address ? h('span', { className: 'relrow__c' }, pub.data.address) : null,
  );
}
