import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { site } from '../lib/data';
import { getPosts } from '../lib/collections';

export const GET: APIRoute = async (context) => {
  const posts = await getPosts();
  return rss({
    title: site.name,
    description: site.description,
    site: context.site!,
    trailingSlash: false,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.summary,
      pubDate: post.data.date,
      link: `/blog/${post.id}`,
      categories: post.data.tags,
    })),
  });
};
