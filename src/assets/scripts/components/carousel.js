// eslint-disable-next-line import/no-named-as-default
import Swiper, {Autoplay, Navigation, Pagination} from 'swiper';
import {inert} from '../utilities/dom.js';

const SELECTOR_LIVE_REGION = '.swiper-wrapper';
const SELECTOR_PAUSE_BUTTON = '.swiper-button-pause';

const CLASS_NAME_TRANSITIONING = 'swiper-transitioning';
const CLASS_NAME_PAUSED = 'swiper-paused';

/**
 * Auto-Rotating Carousel
 *
 * @see {@link https://www.w3.org/TR/wai-aria-practices-1.1/examples/carousel/carousel-1.html}
 */
export const Carousel = {

  /**
   * A callback triggered once the element is attached to the document.
   */
  connected() {
    const delay = this.element.getAttribute('data-carousel-autoplay') || 5000;

    this.liveRegion = this.element.querySelector(SELECTOR_LIVE_REGION);
    this.pauseButton = this.element.querySelector(SELECTOR_PAUSE_BUTTON);

    this.element.style.setProperty('--swiper-autoplay-delay', `${delay / 1000}s`);

    this.swiper = new Swiper(this.element, {
      autoplay: {
        disableOnInteraction: true,
        pauseOnMouseEnter: false,
        delay: delay
      },
      watchOverflow: true,
      navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next'
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      modules: [
        Autoplay,
        Navigation,
        Pagination
      ],
      on: {
        autoplayStart: this.resume.bind(this),
        autoplayPause: this.pause.bind(this),
        autoplayResume: this.resume.bind(this),
        autoplayStop: this.pause.bind(this),
        slideChange: this.update.bind(this),
        slideChangeTransitionStart: () => {
          this.element.classList.add(CLASS_NAME_TRANSITIONING);
        },
        slideChangeTransitionEnd: () => {
          this.element.classList.remove(CLASS_NAME_TRANSITIONING);
        }
      }
    });
  },

  /**
   * A callback triggered once the element is removed from the document.
   */
  disconnected() {
    this.swiper.destroy();
  },

  /**
   * Pause autoplay of the current carousel.
   *
   * @returns {this}
   */
  pause() {
    this.element.classList.add(CLASS_NAME_PAUSED);
    this.liveRegion.setAttribute('aria-live', 'polite');

    if (this.swiper?.autoplay.running) {
      this.swiper?.autoplay.stop();
    }

    return this;
  },

  /**
   * Resume autoplay of the current carousel.
   *
   * @returns {this}
   */
  resume() {
    this.element.classList.remove(CLASS_NAME_PAUSED);
    this.liveRegion.setAttribute('aria-live', 'off');

    if (!this.swiper?.autoplay.running) {
      this.swiper?.autoplay.start();
    }

    return this;
  },

  /**
   * Update the individual slides of the current carousel.
   *
   * @returns {this}
   */
  update() {
    this.swiper.slides.each((slide, index) => {
      const isActive = (index === this.swiper.realIndex);

      if (isActive) {
        slide.setAttribute('aria-current', 'true');
        inert(slide, false);
      } else {
        slide.setAttribute('aria-current', 'false');
        inert(slide, true);
      }
    });

    return this;
  },

  /**
   * @param {MouseEvent} event
   */
  onClick(event) {
    const pauseButton = event.target.closest(SELECTOR_PAUSE_BUTTON);

    if (pauseButton) {
      if (this.swiper?.autoplay.running) {
        this.pause();
      } else {
        this.resume();
      }
    }
  }

};

export default Carousel;
