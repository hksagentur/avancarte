module.exports = {
  title: '',
  description: '',
  lang: 'de',
  locale: 'de_DE',
  draft: false,
  sitemap: false,
  order: 0,
  tags: [],
  images: [],
  videos: [],
  attachments: [],
  includes: [
    'contact'
  ],
  eleventyComputed: {
    eleventyNavigation({page, menu, parent, order}) {
      if (menu) {
        return {
          title: menu,
          key: page.fileSlug,
          parent: parent,
          order: order,
        };
      }
    },
    eleventyExcludeFromCollections({draft, eleventyExcludeFromCollections}) {
      if (draft && !process.env.DRAFTS) {
        return true;
      }

      return eleventyExcludeFromCollections === true;
    },
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
    language({languages, lang}) {
      return languages?.[lang];
    },
    translations({collections, page, language, translationKey}) {
      return collections.all.filter(({fileSlug, data}) => {
        if (
          (language === undefined) ||
          (data.lang === undefined)
        ) {
          return false;
        }

        if (
          (translationKey !== undefined) &&
          (data.translationKey !== undefined) &&
          (data.translationKey === translationKey)
        ) {
          return true;
        }

        return fileSlug === page.fileSlug;
      });
    }
  }
};
