import type { APIContext } from 'astro';
import { publicPosts, postUrl, pathTo, tagCounts, tagUrl } from '../lib/posts';

const escapeXml = (text: string) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');

export async function GET(context: APIContext) {
  const posts = await publicPosts();
  const paths = ['', 'posts/', 'tags/', 'about/'].map(pathTo);
  const urls = [...paths, ...posts.map(postUrl), ...tagCounts(posts).map(([tag]) => tagUrl(tag))];
  const body = '<?xml version="1.0" encoding="UTF-8"?>' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    urls.map(path => '<url><loc>' + escapeXml(new URL(path, context.site!).href) + '</loc></url>').join('') +
    '</urlset>';
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
