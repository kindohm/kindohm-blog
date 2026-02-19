const fs = require("fs");
const path = require("path");
const isDev = process.env.ELEVENTY_ENV !== "production";
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");

const IMAGE_EXTS = /\.(png|jpg|jpeg|gif|svg|webp)$/i;

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(feedPlugin, {
    type: "rss",
    outputPath: "/rss.xml",
    collection: {
      name: "posts",
      limit: 10,
    },
  });

  eleventyConfig.addPassthroughCopy("style.css");

  eleventyConfig.on("eleventy.after", async ({ dir, results }) => {
    for (const result of results) {
      if (!/posts\/\d{4}-\d{2}-\d{2}\/index\.md$/.test(result.inputPath)) continue;
      const inputDir = path.dirname(result.inputPath);
      const outputDir = path.join(dir.output, result.url);
      for (const file of fs.readdirSync(inputDir)) {
        if (!IMAGE_EXTS.test(file)) continue;
        fs.mkdirSync(outputDir, { recursive: true });
        fs.copyFileSync(path.join(inputDir, file), path.join(outputDir, file));
      }
    }
  });

  eleventyConfig.addFilter("absoluteImageUrls", (content, baseUrl) => {
    return content.replace(
      /<img([^>]+)src="(?!https?:\/\/|\/)([^"]+)"/gi,
      (_match, before, src) => `<img${before}src="${baseUrl}${src}"`
    );
  });

  eleventyConfig.addFilter("dateDisplay", (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  });

  eleventyConfig.addFilter("dateISO", (date) => {
    return new Date(date).toISOString().split("T")[0];
  });

  eleventyConfig.addCollection("posts", function (collectionApi) {
    let posts = collectionApi.getFilteredByGlob("posts/**/*.md");
    if (!isDev) {
      posts = posts.filter((p) => !p.data.draft);
    }
    return posts.sort((a, b) => b.date - a.date);
  });

  return {
    dir: {
      layouts: "_layouts",
    },
  };
};
