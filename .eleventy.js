const EleventyNavigationPlugin = require('@11ty/eleventy-navigation');

const {EleventyRenderPlugin} = require('@11ty/eleventy');
const {format} = require('node:util');
const {config} = require('dotenv');
const {load} = require('js-yaml');
const {sortBy} = require('lodash');

/**
 * @param { import('@11ty/eleventy/src/UserConfig') } eleventy
 */
module.exports = function (eleventy) {
  // Environment variables
  config();

  // Plugins
  eleventy.addPlugin(EleventyRenderPlugin);
  eleventy.addPlugin(EleventyNavigationPlugin);

  // Layouts
  eleventy.addLayoutAlias('event', 'post.njk');
  eleventy.addLayoutAlias('job', 'post.njk');

  // Passthrough Copies
  eleventy.addPassthroughCopy('src/assets/fonts');
  eleventy.addPassthroughCopy('src/assets/images');
  eleventy.addPassthroughCopy('src/assets/media');

  eleventy.addPassthroughCopy({'netlify/cms': 'admin'});

  // Watch Targets
  eleventy.addWatchTarget('src/assets/styles');
  eleventy.addWatchTarget('src/assets/scripts');

  // Filters
  eleventy.addFilter('format', format);
  eleventy.addFilter('sort_by', sortBy);

  eleventy.addFilter('absolute_url', require('./eleventy/filters/absolute-url'));
  eleventy.addFilter('append', require('./eleventy/filters/append'));
  eleventy.addFilter('at_least', require('./eleventy/filters/at-least'));
  eleventy.addFilter('at_most', require('./eleventy/filters/at-most'));
  eleventy.addFilter('date', require('./eleventy/filters/date'));
  eleventy.addFilter('dump', require('./eleventy/filters/dump'));
  eleventy.addFilter('excerpt', require('./eleventy/filters/excerpt'));
  eleventy.addFilter('iso8601', require('./eleventy/filters/iso8601'));
  eleventy.addFilter('json_attribute', require('./eleventy/filters/json-attribute'));
  eleventy.addFilter('json', require('./eleventy/filters/json'));
  eleventy.addFilter('markdown', require('./eleventy/filters/markdown'));
  eleventy.addFilter('merge', require('./eleventy/filters/merge'));
  eleventy.addFilter('obfuscate', require('./eleventy/filters/obfuscate'));
  eleventy.addFilter('pluck', require('./eleventy/filters/pluck'));
  eleventy.addFilter('prepend', require('./eleventy/filters/prepend'));
  eleventy.addFilter('same_day', require('./eleventy/filters/same-day'));
  eleventy.addFilter('skip', require('./eleventy/filters/skip'));
  eleventy.addFilter('slug', require('./eleventy/filters/slug'));
  eleventy.addFilter('take', require('./eleventy/filters/take'));
  eleventy.addFilter('tagged_with', require('./eleventy/filters/tagged-with'));
  eleventy.addFilter('tel', require('./eleventy/filters/tel'));
  eleventy.addFilter('trans', require('./eleventy/filters/trans'));
  eleventy.addFilter('upcoming', require('./eleventy/filters/upcoming'));
  eleventy.addFilter('where', require('./eleventy/filters/where'));

  // Shortcodes
  eleventy.addAsyncShortcode('svg', require('./eleventy/shortcodes/svg'));
  eleventy.addShortcode('icon', require('./eleventy/shortcodes/icon'));
  eleventy.addShortcode('image', require('./eleventy/shortcodes/image'));

  // Transforms
  eleventy.addTransform('minify-html', require('./eleventy/transforms/minify-html'));

  // Custom Template Formats
  eleventy.addExtension('bundle.css', require('./eleventy/extensions/postcss'));
  eleventy.addExtension('bundle.js', require('./eleventy/extensions/rollup'));

  // Custom Data Formats
  eleventy.addDataExtension('yml', (content) => load(content));

  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: 'includes',
      layouts: 'layouts',
      data: 'data'
    },
    templateFormats: [
      'njk',
      'md',
      '11ty.js',
      'bundle.js',
      'bundle.css'
    ],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk'
  };
};
