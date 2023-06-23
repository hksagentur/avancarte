module.exports = {
  layout: 'post',
  tags: [
    'post'
  ],
  cover: '/assets/media/adobestock-99649200.jpg',
  draft: false,
  sitemap: true,
  eleventyComputed: {
    permalink({page, lang, draft}) {
      if (draft && !process.env.DRAFTS) {
        return false;
      }

      return `/${lang}/posts/${page.fileSlug}/`;
    },
  },
};
