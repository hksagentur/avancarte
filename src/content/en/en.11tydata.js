module.exports = {
  lang: 'en',
  locale: 'en_US',
  tags: [
    'en'
  ],
  eleventyComputed: {
    permalink({page, lang, draft, parent, permalink}) {
      if (draft && !process.env.DRAFTS) {
        return false;
      }

      if (permalink) {
        return permalink;
      }

      if (parent) {
        return `/${lang}/${parent}/${page.fileSlug}/`;
      }

      return `/${lang}/${page.fileSlug}/`;
    },
  }
};
