module.exports = {
  layout: 'employee',
  tags: [
    'employee'
  ],
  permalink: false,
  draft: false,
  sitemap: false,
  group: '9-Fachkraft',
  eleventyComputed: {
    groupName({group}) {
      return group?.split('-').pop();
    },
    groupWeight({group}) {
      return group?.split('-').shift();
    }
  }
};