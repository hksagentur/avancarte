module.exports = {
  layout: 'employee',
  tags: [
    'employee'
  ],
  draft: false,
  sitemap: false,
  group: '9-Professional',
  eleventyComputed: {
    permalink() {
      return false;
    },
    groupName({group}) {
      return group?.split('-').pop();
    },
    groupWeight({group}) {
      return group?.split('-').shift();
    }
  }
};
