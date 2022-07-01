module.exports = {
  layout: 'page',
  tags: [
    'page'
  ],
  draft: false,
  sitemap: true,
  attachments: [
    'contact'
  ],
  eleventyComputed: {
    isHomepage({page, language}) {
      return page.url === language.url;
    },
  }
};
