const htmlmin = require("html-minifier-terser");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addPassthroughCopy("src/bundle.css");

  // https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs
  eleventyConfig.addPassthroughCopy('src/favicon.ico');
  eleventyConfig.addPassthroughCopy('src/icon.svg');
  eleventyConfig.addPassthroughCopy('src/apple-touch-icon.png');
  eleventyConfig.addPassthroughCopy('src/icon-192.png');
  eleventyConfig.addPassthroughCopy('src/icon-512.png');
  eleventyConfig.addPassthroughCopy('src/manifest.webmanifest');

  eleventyConfig.addPassthroughCopy('src/meta.png');
  eleventyConfig.addPassthroughCopy('src/robots.txt');
  eleventyConfig.addPassthroughCopy('src/humans.txt');
  eleventyConfig.addPassthroughCopy('src/img');

  // https://huphtur.nl/eleventy-filter-to-turn-url-into-domain-name/
  eleventyConfig.addFilter("domainify", function (string) {
    return new URL(string).hostname.replace('www.', '');
  });

  eleventyConfig.addFilter('values', Object.values);

  eleventyConfig.addTransform("htmlmin", function(content) {
    // Prior to Eleventy 2.0: use this.outputPath instead
    if( this.page.outputPath && this.page.outputPath.endsWith(".html") ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true
      });
      return minified;
    }

    return content;
  });

  return {
    dir: {
      input: 'src',
    },
  };
};
