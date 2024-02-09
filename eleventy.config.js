module.exports = function (eleventyConfig) {
  // https://github.com/huphtur/hella-simple-eleventy-tailwind-starter
  eleventyConfig.setServerOptions({
    watch: ['_site/**/*.css'],
  });

  // https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs
  eleventyConfig.addPassthroughCopy('src/favicon.ico');
  eleventyConfig.addPassthroughCopy('src/icon.svg');
  eleventyConfig.addPassthroughCopy('src/apple-touch-icon.png');
  eleventyConfig.addPassthroughCopy('src/icon-192.png');
  eleventyConfig.addPassthroughCopy('src/icon-512.png');
  eleventyConfig.addPassthroughCopy('src/manifest.webmanifest');
  
  eleventyConfig.addPassthroughCopy('src/meta.png');
  eleventyConfig.addPassthroughCopy('src/robots.txt');

  // https://huphtur.nl/eleventy-filter-to-turn-url-into-domain-name/
  eleventyConfig.addFilter("domainify", function(string) {
    return new URL(string).hostname.replace('www.','');
  });

  eleventyConfig.addFilter('values', Object.values);
  
  return {
    dir: {
      input: 'src',
    },
  };
};
