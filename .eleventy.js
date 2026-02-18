const isDev = process.env.ELEVENTY_ENV !== "production";
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");

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
  eleventyConfig.addPassthroughCopy("posts/**/*.{png,jpg,jpeg,gif,svg,webp}");

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
