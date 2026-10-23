import { defineConfig } from 'astro/config';
import { siteConfig } from './site.config.mjs';

const base = process.env.BLOG_BASE ?? siteConfig.base;

export default defineConfig({
  site: process.env.BLOG_SITE || siteConfig.site,
  base,
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
});
