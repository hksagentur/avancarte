module.exports = {
  layout: 'job',
  tags: [
    'job'
  ],
  permalink: false,
  draft: false,
  sitemap: false,
  eleventyComputed: {
    permalink({page, lang, draft}) {
      if (draft && !process.env.DRAFTS) {
        return false;
      }

      return `/${lang}/company/jobs/${page.fileSlug}/`;
    },
  },
};
