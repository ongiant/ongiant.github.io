# ongiant 的技术博客

基于 Astro 的中文静态博客，默认部署目标为 GitHub Pages。

源码仓库为 `ongiant/ongiant.github.io`，生产站点地址为 `https://ongiant.github.io`。推送到 `main` 后由 GitHub Actions 构建发布，最新上线状态以 Actions 的部署结果为准。

## 已有功能

- 首页、文章归档和标签页。
- 文章正文全文搜索。
- 深色与浅色主题。
- 文章目录和代码复制。
- RSS、sitemap 和 404 页面。
- Markdown 写作；只有明确设置 `published: true` 的文章才参与公开构建。

## 本地运行

使用 **Node.js 24** 和 npm。在本项目根目录打开终端，执行：

```sh
npm install
npm run dev
```

在浏览器打开终端显示的本地地址。开发服务器运行期间，保存文章或页面修改后即可查看变化；使用 `Ctrl+C` 停止。

发布前检查并构建：

```sh
npm run check
npm run build
```

构建文件位于 `dist/`。需要检查构建后的页面时，运行 `npm run preview`，再打开终端显示的地址。

## 先改这几处

1. 编辑 `site.config.mjs` 中的站点标题、简介、作者、GitHub 链接和关于介绍。
2. 检查 `src/pages/about.astro` 的关于页内容，将介绍改成自己的表达。
3. 替换或删除 `src/content/posts/` 下三篇已明确标记的示例文章。示例当前设置为公开，会随首次部署一起发布。
4. 按 [写作指南](WRITING.md) 创建第一篇真实文章，完成预览后再公开。

主要目录：

```text
site.config.mjs          站点名称、作者、地址及介绍
src/content/posts/       Markdown 文章
src/pages/               页面与内容入口
src/components/          页面组件
src/layouts/             页面布局
src/styles/              样式
scripts/                 写作辅助脚本
.github/workflows/       GitHub Pages 部署工作流
```

## 部署到 GitHub Pages

1. 使用 GitHub 账号 `ongiant` 创建 **public** 仓库，仓库名填 `ongiant.github.io`。
2. 将本项目的根目录文件上传或推送到仓库的 `main` 分支。仓库根目录应直接出现 `package.json`、`site.config.mjs`、`src/` 和 `.github/`，不要再套一层 `public-tech-blog/` 目录。
3. 确认隐藏目录 `.github/` 及其中的工作流文件也已上传。不要上传 `node_modules/`、`.astro/` 或本地构建目录 `dist/`。
4. 在仓库打开 **Settings → Pages**，将 **Build and deployment** 下的 **Source** 设为 **GitHub Actions**。
5. 推送一次提交到 `main`，部署工作流会自动触发。在 **Actions** 中查看构建和部署结果；若此前已经推送，可以在设置完成后继续推送一次修改。
6. 工作流成功后，在 **Settings → Pages** 查看实际发布地址，再访问站点检查文章、搜索、RSS 和页面链接。

默认用户站点无需修改地址配置：

```js
site: 'https://ongiant.github.io',
base: '/',
```

后续向 `main` 推送修改会再次构建部署。源码更新与网站更新之间会有构建时间，以 Actions 的结果为准。

### 使用其他仓库名或自定义域名

部署工作流会根据仓库信息计算 GitHub Pages 的站点地址及 base URL，支持形如 `https://ongiant.github.io/仓库名/` 的项目站点。若要在本地预览相同路径，也应同步调整 `site.config.mjs` 的 `site` 和 `base`。

使用自定义域名时，在 **Settings → Pages** 配置域名，按 GitHub 的提示完成域名解析，并同步将 `site.config.mjs` 的 `site` 改为正式的 HTTPS 地址。根域名或子域名直接承载博客时，`base` 通常保持 `/`。重新部署后检查站内链接、RSS 和 sitemap 中的地址。

## 内容公开范围

这是公开技术博客。文章设置 `published: false` 或省略该字段时，不会进入文章页面、列表、搜索、RSS 和 sitemap 等公开构建产物；但如果提交到 public 仓库，**Markdown 源文件和 Git 历史依然可以被任何人查看**。

`published` 是发布开关，不能保护私人内容。私人日记、思想随笔和私人附件不要放进这个项目；`public/` 中的静态资源也会随网站发布。已经推送的内容不能仅靠修改文章开关撤回所有副本。

## 发布前快速检查

- 已替换示例文章和默认介绍，标题、日期、描述与标签准确。
- 需要公开的文章明确设置 `published: true`。
- 手机阅读、深浅色、目录、代码复制和正文搜索正常。
- 图片、站内链接、RSS 和 sitemap 使用正确的站点地址。
- `npm run check` 与 `npm run build` 均通过。
