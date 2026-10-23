import type { APIContext } from 'astro';
import { pathTo } from '../lib/posts';

export function GET(context: APIContext) {
  return new Response('User-agent: *\nAllow: /\n\nSitemap: ' + new URL(pathTo('sitemap.xml'), context.site!).href + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
