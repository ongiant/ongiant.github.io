import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export async function publicPosts() {
  return (await getCollection('posts', ({ data }) => data.published))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function pathTo(path = '') {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return base + '/' + path.replace(/^\//, '');
}

export function postUrl(post: Post) {
  return pathTo('posts/' + post.id.split('/').map(encodeURIComponent).join('/') + '/');
}

export function tagUrl(tag: string) {
  return pathTo('tags/' + encodeURIComponent(tagSlug(tag)) + '/');
}

export function tagSlug(tag: string) {
  // Encode punctuation into a single path segment. Underscores are encoded too,
  // keeping labels such as "CI/CD" and "CI_2f_CD" from colliding.
  return Array.from(tag).map(character => /^[a-zA-Z0-9\u3400-\u9fff-]$/.test(character)
    ? character
    : '_' + character.codePointAt(0)!.toString(16) + '_').join('');
}

export function shortDate(date: Date) {
  return date.toISOString().slice(0, 10).replaceAll('-', '.');
}

export function readingMinutes(body = '') {
  const chinese = (body.match(/[\u3400-\u9fff]/g) || []).length;
  const words = (body.replace(/[\u3400-\u9fff]/g, ' ').match(/\S+/g) || []).length;
  return Math.max(1, Math.ceil(chinese / 350 + words / 220));
}

export function tagCounts(posts: Post[]) {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of new Set(post.data.tags)) {
      counts.set(tag, (counts.get(tag) || 0) + 1);
    }
  }
  return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'zh-CN'));
}
