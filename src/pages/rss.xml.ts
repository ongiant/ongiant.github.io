import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { publicPosts, postUrl, pathTo } from '../lib/posts';
import { siteConfig } from '../../site.config.mjs';

export async function GET(context: APIContext) {
  const posts = await publicPosts();
  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: new URL(pathTo(), context.site!),
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: postUrl(post),
    })),
    customData: '<language>zh-CN</language>',
  });
}
