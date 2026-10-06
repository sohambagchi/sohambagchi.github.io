import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import remarkSmartypants from 'remark-smartypants';
import { marginNotes } from './src/plugins/margin-notes.mjs';

export default defineConfig({
  site: 'https://sohambagchi.github.io',
  trailingSlash: 'never',
  // One .html per route, so /publications resolves on GitHub Pages without a redirect.
  build: { format: 'file' },
  integrations: [react(), sitemap()],
  markdown: {
    // Astro's own smartypants reads "--" as an em dash; 'oldschool' matches the rest of the site,
    // where "--" is an en dash and "---" an em dash.
    smartypants: false,
    remarkPlugins: [[remarkSmartypants, { dashes: 'oldschool' }]],
    rehypePlugins: [marginNotes],
  },
});
