module.exports = {
  lang: 'de',
  locale: 'de_DE',
  tags: [
    'de'
  ],
  eleventyComputed: {
    permalink({page, draft, parent, permalink}) {
      if (draft && !process.env.DRAFTS) {
        return false;
      }

      if (permalink) {
        return permalink;
      }

      if (parent) {
        return `/${parent}/${page.fileSlug}/`;
      }

      return `/${page.fileSlug}/`;
    },
  },
};
