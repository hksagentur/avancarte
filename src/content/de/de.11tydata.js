module.exports = {
  lang: 'de',
  locale: 'de_DE',
  tags: [
    'de'
  ],
  eleventyComputed: {
    permalink({page, parent, draft}) {
      if (draft && !process.env.DRAFTS) {
        return false;
      }

      if (parent) {
        return `/${parent}/${page.fileSlug}/`;
      }

      return `/${page.fileSlug}/`;
    },
  },
};
