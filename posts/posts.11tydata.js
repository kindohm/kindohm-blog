module.exports = {
  layout: "post.njk",
  eleventyComputed: {
    permalink: function(data) {
      if (!data.title) return undefined;
      const dateMatch = data.page.inputPath.match(/(\d{4}-\d{2}-\d{2})/);
      if (!dateMatch) return undefined;
      return `/posts/${dateMatch[1]}/${this.slugify(data.title)}/`;
    },
  },
};
