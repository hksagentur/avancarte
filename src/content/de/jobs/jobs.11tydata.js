module.exports = {
  layout: 'job',
  tags: [
    'job'
  ],
  cover: '/assets/media/jobs.jpg',
  draft: false,
  sitemap: true,
  eleventyComputed: {
    permalink({page, draft}) {
      if (draft && !process.env.DRAFTS) {
        return false;
      }

      return `/unternehmen/karriere/${page.fileSlug}/`;
    },
  },
};
