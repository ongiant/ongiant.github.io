import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const [slug, ...titleParts] = process.argv.slice(2);
if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error('用法：npm run new -- my-first-post "文章标题"\n文件名仅使用小写英文字母、数字和连字符。');
  process.exit(1);
}
const title = titleParts.join(' ') || '新文章';
const today = new Intl.DateTimeFormat('en-CA', { timeZone: process.env.TZ || Intl.DateTimeFormat().resolvedOptions().timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
const content = ['---', 'title: ' + JSON.stringify(title), 'description: "用一两句话概括文章内容。"', 'date: ' + today, 'tags: []', 'published: false', 'featured: false', 'example: false', '---', '', '## 从一个问题开始', '', '在这里写下你的文章。', ''].join('\n');
const target = resolve('src/content/posts', slug + '.md');
try {
  await writeFile(target, content, { flag: 'wx' });
  console.log('已创建：src/content/posts/' + slug + '.md');
  console.log('写好后将 published 改为 true，再预览并发布。');
} catch (error) {
  console.error(error.code === 'EEXIST' ? '同名文章已存在，请换一个文件名。' : error.message);
  process.exit(1);
}
