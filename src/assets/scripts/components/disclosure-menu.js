const SELECTOR_EXPANDABLE = 'button[aria-expanded]';
const SELECTOR_FOCUSABLE = 'a[href], button[aria-expanded]';

const CLASS_NAME_ACTIVE = 'is-active';

/**
 * Determine whether the given element is expandable.
 *
 * @param {HTMLElement} element
 * @returns {boolean}
 */
function isExpandable(element) {
  return element.hasAttribute('aria-expanded');
}

/**
 * Determine whether the given element is expanded.
 *
 * @param {HTMLElement} element
 * @returns {boolean}
 */
function isExpanded(element) {
  return element.getAttribute('aria-expanded') === 'true';
}

/**
 * Find the related element whose contents or presence is controlled by the
 * given element.
 *
 * @param {HTMLElement} element
 * @returns {?HTMLElement}
 */
function findRelatedElement(element) {
  const id = element?.getAttribute('aria-controls') || '';

  return id
    ? document.getElementById(id)
    : null;
}

/**
 * Accessible Disclosure Navigation
 *
 * @see {@link https://www.w3.org/TR/wai-aria-practices-1.1/examples/disclosure/disclosure-navigation.html}
 */
export const DisclosureMenu = {

  /**
   * A callback triggered once the element is attached to the document.
   */
  connected() {
    this.expandedControl = null;

    this.controls = Array.from(
      this.element.querySelectorAll(`:scope > li > a[href], :scope > li > ${SELECTOR_EXPANDABLE}`)
    );

    this.controls
      .filter((control) => isExpandable(control))
      .forEach((control) => this.toggle(control, isExpanded(control)));
  },

  /**
   * Get the first control of the current menu.
   *
   * @returns {?HTMLElement}
   */
  first() {
    return this.nth(0);
  },

  /**
   * Get a control by its index position.
   *
   * @param {number} index
   * @returns {?HTMLElement}
   */
  nth(index) {
    return this.controls[index] || null;
  },

  /**
   * Get the last control of the current menu.
   *
   * @returns {?HTMLElement}
   */
  last() {
    return this.nth(this.controls.length - 1);
  },

  /**
   * Expand the menu associated with the given control.
   *
   * @param {HTMLElement} control
   * @returns {this}
   */
  expand(control) {
    const relatedElement = findRelatedElement(control);

    control.setAttribute('aria-expanded', 'true');
    relatedElement?.classList.add(CLASS_NAME_ACTIVE);

    if (this.expandedControl) {
      this.collapse(this.expandedControl);
    }

    this.expandedControl = control;

    return this;
  },

  /**
   * Collapse the menu associated with the given control.
   *
   * @param {HTMLElement} control
   * @returns {this}
   */
  collapse(control) {
    const relatedElement = findRelatedElement(control);

    control.setAttribute('aria-expanded', 'false');
    relatedElement?.classList.remove(CLASS_NAME_ACTIVE);

    if (this.expandedControl === control) {
      this.expandedControl = null;
    }

    return this;
  },

  /**
   * Toggle the visibility of the menu associated with the given control.
   *
   * @param {HTMLElement} control
   * @param {boolean} [force]
   * @returns {boolean}
   */
  toggle(control, force) {
    const expand = (force !== undefined) ? force : !isExpanded(control);

    if (expand) {
      this.expand(control);
    } else {
      this.collapse(control);
    }

    return expand;
  },

  /**
   * Collapse the currently active control.
   *
   * @returns {this}
   */
  close() {
    if (this.expandedControl) {
      this.collapse(this.expandedControl);
    }

    return this;
  },

  /**
   * @param {MouseEvent} event
   */
  onClick(event) {
    const targetElement = event.target.closest(SELECTOR_EXPANDABLE);

    if (this.controls.includes(targetElement)) {
      this.toggle(targetElement);
    }
  },

  /**
   * @param {KeyboardEvent} event
   */
  onKeyDown(event) {
    const targetElement = event.target.closest(SELECTOR_FOCUSABLE);
    const targetElementIndex = this.controls.indexOf(targetElement);

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp': {
        if (targetElementIndex === -1) {
          return;
        }

        event.preventDefault();
        this.nth(targetElementIndex - 1)?.focus();
        break;
      }

      case 'ArrowRight': {
        if (targetElementIndex === -1) {
          return;
        }

        event.preventDefault();
        this.nth(targetElementIndex + 1)?.focus();
        break;
      }

      case 'ArrowDown': {
        if (targetElementIndex === -1) {
          return;
        }

        const focusTarget = isExpandable(targetElement) && isExpanded(targetElement)
          ? findRelatedElement(targetElement)?.querySelector('a')
          : this.nth(targetElementIndex + 1);

        event.preventDefault();
        focusTarget?.focus();
        break;
      }

      case 'Home': {
        if (targetElementIndex === -1) {
          return;
        }

        event.preventDefault();
        this.first()?.focus();
        break;
      }

      case 'End': {
        if (targetElementIndex === -1) {
          return;
        }

        event.preventDefault();
        this.last()?.focus();
        break;
      }

      case 'Escape': {
        const isExpandedControl = (
          this.expandedControl === targetElement
        );

        const isRelatedToExpandedControl = (
          this.expandedControl !== null &&
          findRelatedElement(this.expandedControl)?.contains(targetElement)
        );

        if (isExpandedControl || isRelatedToExpandedControl) {
          event.preventDefault();
          this.expandedControl.focus();
          this.close();
        }
        break;
      }
    }
  },

  /**
   * @param {FocusEvent} event
   */
  onFocusOut(event) {
    const menuHasFocus = this.element.contains(event.relatedTarget);

    if (!menuHasFocus) {
      this.close();
    }
  }
};

export default DisclosureMenu;
