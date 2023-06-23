module.exports = {
  lang: 'en',
  locale: 'en_US',
  tags: [
    'en'
  ],
  eleventyComputed: {
    permalink({page, lang, parent, draft}) {
      if (draft && !process.env.DRAFTS) {
        return false;
      }

      if (parent) {
        return `/${lang}/${parent}/${page.fileSlug}/`;
      }

      return `/${lang}/${page.fileSlug}/`;
    },
  }
};
