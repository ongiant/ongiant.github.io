import { publicPosts, postUrl, shortDate } from '../lib/posts';

export async function GET() {
  const posts = await publicPosts();
  return Response.json(posts.map(post => ({
    title: post.data.title,
    description: post.data.description,
    tags: post.data.tags,
    body: post.body || '',
    url: postUrl(post),
    date: shortDate(post.data.date),
  })));
}
