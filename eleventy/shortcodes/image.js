const Image = require('@11ty/eleventy-img');
const path = require('node:path');

/**
 * A map of image presets.
 *
 * @type {Object<string, object>}
 */
const ImagePresets = {
  billboard: {
    widths: [
      'auto',
      2368,
      1579,
      1184,
      592,
      395
    ],
    sizes: [
      '(min-width: 768px) 50vw',
      '(min-width: 1184px) 592px',
      '100vw'
    ]
  },
  cover: {
    widths: [
      'auto',
      2368,
      1579,
      1184,
      592,
      395
    ],
    sizes: [
      '(min-width: 1184px) 1184px',
      '100vw'
    ]
  },
  employee: {
    widths: [
      'auto',
      1360,
      680,
      340
    ],
    sizes: [
      '(min-width: 560px) 50vw',
      '(min-width: 864px) 33vw',
      '(min-width: 1184px) 340px',
      '100vw'
    ]
  },
  event: {
    widths: [
      'auto',
      1360,
      680,
      340
    ],
    sizes: [
      '(min-width: 560px) 50vw',
      '(min-width: 864px) 33vw',
      '(min-width: 1184px) 340px',
      '100vw'
    ]
  },
  post: {
    widths: [
      'auto',
      1360,
      680,
      340
    ],
    sizes: [
      '(min-width: 560px) 50vw',
      '(min-width: 848px) 33vw',
      '(min-width: 1136px) 25vw',
      '(min-width: 1184px) 270px',
      '100vw'
    ]
  }
};

/**
 * Generate a picture element that reference multiple size variations of an
 * image.
 *
 * @param {string} source Relative path to the source image to process.
 * @param {object} [options={}] Additional shortcode options.
 * @param {string|string[]} [options.classes='image'] The classes to add to the image element.
 * @param {string} [options.loading='lazy'] The loading strategy.
 * @param {string} [options.alt=''] The alternative text of the image.
 * @param {string} [options.preset=''] The name of the image preset to use.
 * @returns {string}
 */
function imageShortcode(source, options = {}) {
  const {
    classes = 'o-image',
    loading = 'lazy',
    alt = '',
    preset = null
  } = options;

  const {
    formats = ['webp', 'jpeg'],
    widths = [1920],
    sizes = ['100vw'],
    quality = 80
  } = ImagePresets[preset] ?? {};

  const fileName = path.join('src', source);
  const fileDirectory = path.relative('src', path.dirname(fileName));

  const imageOptions = {
    widths,
    formats,
    urlPath: `/${fileDirectory}/`,
    outputDir: path.join('dist', fileDirectory),
    sharpPngOptions: {
      quality,
      progressive: true
    },
    sharpJpegOptions: {
      quality,
      mozjpeg: true,
      progressive: true
    },
    sharpWebpOptions: {
      quality
    },
    filenameFormat(id, source_, width, format) {
      const extension = path.extname(source_);
      const name = path.basename(source_, extension);

      return `${name}-${width}w.${format}`;
    }
  };

  // Generate the image asynchronously to avoid problems in Nunjuck templates.
  Image(fileName, imageOptions);

  const metadata = Image.statsSync(fileName, imageOptions);

  const attributes = {
    class: Array.isArray(classes) ? classes.join(' ') : classes,
    alt,
    sizes: sizes.join(', '),
    loading,
    decoding: (loading === 'lazy' ? 'async' : 'sync')
  };

  return Image.generateHTML(metadata, attributes);
}

module.exports = imageShortcode;
