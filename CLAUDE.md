This is a minimal static blog build with Eleventy.

# commands

- build `npm run build`
- local dev `npm run dev`

# conventions & tech

- node v24
- eleventy for static site generation
- use kebab-case for filenames
- use nunjucks for templating

# blog requirements

- post files go in `posts/` as markdown
- post files may exist as a single file: `posts/yyyy-mm-dd.md`
- post files may also exist as a folder with an index.html file, which allows images or media to be stored along side the post:
  - `posts/yyyy-mm-dd/index.html`
  - `posts/yyyy-mm-dd/post-image.png`
- main index page will contain a list of blog posts
- post front matter will include:
  - title
  - draft (true/false)
- post dates will be derived from the filename or folder and does not need to be in front matter.
- draft posts should be available when running local dev, but not included with the `build` command

# layouts

- create a layout.njk template that all other sub-templates or pages will inherit from. layout.njk will contain the HTML boilerplate, etc
- create a post.njk template for individual posts. I'm not sure what else will go in post.njk yet. _maybe_ a "previous" and "next" link feature but not at first.

# deployment

Site will be hosted on Netlify. The `build` command
should be sufficient.

# styling

- site content and posts should use semantic HTML
- site styling and aesthetic should be minimal, even brutalist
- emphasize reading and crawling, not fancy features
