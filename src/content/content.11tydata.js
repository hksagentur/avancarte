module.exports = {
  title: '',
  description: '',
  permalink: '{% if parent %}/{{ parent }}{% endif %}/{{ page.fileSlug }}/',
  lang: 'de',
  locale: 'de_DE',
  draft: false,
  sitemap: false,
  order: 0,
  tags: [],
  images: [],
  videos: [],
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
