import { time } from '../utilities/date.js';

/**
 * Accessible Card Component
 *
 * @see {https://inclusive-components.design/cards/}
 */
export const Card = {

  connected() {
    this.link = this.element.querySelector('a');

    this.mouseDownThreshold = 200;
    this.mouseDownAt = null;
  },

  disconnected() {
    this.link = null;
  },

  visitLink() {
    if (this.link) {
      this.link.click();
    }
  },

  onMouseDown() {
    this.mouseDownAt = time();
  },

  onMouseUp() {
    // Allow text selection by measuring the time elapsed between the separate
    // mouse events.
    const timeElapsed = time() - this.mouseDownAt;

    if (timeElapsed < this.mouseDownThreshold) {
      this.visitLink();
    }

    this.mouseDownAt = null;
  }

};
