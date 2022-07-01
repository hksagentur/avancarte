module.exports = {
  layout: 'page',
  tags: [
    'page'
  ],
  draft: false,
  sitemap: true,
  eleventyComputed: {
    isHomepage({page, language}) {
      return page.url === language.url;
    },
  }
};
