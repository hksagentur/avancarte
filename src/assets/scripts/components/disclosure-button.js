export const DisclosureButton = {

  /**
   * Indicates whether the current control is expanded or collapsed.
   *
   * @returns {boolean}
   */
  get expanded() {
    return this.element.getAttribute('aria-expanded') === 'true';
  },

  /**
   * A callback triggered once the element is attached to the document.
   */
  connected() {
    if (this.element.hasAttribute('aria-controls')) {
      this.targetElement = document.getElementById(this.element.getAttribute('aria-controls'));
    }

    this.toggle(this.expanded);
  },

  /**
   * Show the related element.
   *
   * @returns {this}
   */
  expand() {
    this.element.setAttribute('aria-expanded', 'true');
    this.targetElement?.classList.add('is-active');

    return this;
  },

  /**
   * Hide the related element.
   *
   * @returns {this}
   */
  collapse() {
    this.element.setAttribute('aria-expanded', 'false');
    this.targetElement?.classList.remove('is-active');

    return this;
  },

  /**
   * Toggle the presence of the related element.
   *
   * @param {boolean} [force]
   * @returns {boolean}
   */
  toggle(force) {
    const expand = (force !== undefined) ? force : !this.expanded;

    if (expand) {
      this.expand();
    } else {
      this.collapse();
    }

    return expand;
  },

  /**
   * @param {MouseEvent} event
   */
  onClick(event) {
    event.preventDefault();
    this.toggle();
  },

  /**
   * @param {KeyboardEvent} event
   */
  onKeyDown(event) {
    switch (event.key) {
      case 'Escape':
        this.collapse();
        break;
    }
  }
};

export default DisclosureButton;
