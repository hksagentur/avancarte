/**
 * An incomplete list of CSS selectors for focusable HTML elements.
 *
 * @type {string}
 */
const SELECTOR_FOCUSABLE = `
  a[href],
  button:not([disabled]),
  input:not([type="hidden"]):not([disabled]),
  select:not([disabled]),
  textarea:not([disabled]),
  [tabindex]:not([tabindex^="-"]),
  details,
  summary,
  iframe
`;

/**
 * Returns the reference of the first element that matches the given CSS
 * selector.
 *
 * @param {string} selector The CSS selector.
 * @param {Element} context The element to start searching from.
 * @returns {?Element}
 */
export function $(selector, context = document) {
  return context.querySelector(selector);
}

/**
 * Returns the reference of all elements that matches the given CSS selector.
 *
 * @param {string} selector The CSS selector.
 * @param {Element} context The element to start searching from.
 * @returns {Element[]}
 */
export function $$(selector, context = document) {
  return Array.prototype.slice.call(context.querySelectorAll(selector));
}

/**
 * Event handler to prevent focus on elements.
 *
 * @param {FocusEvent} event
 */
export function preventFocus(event) {
  event.preventDefault();

  if (event.relatedTarget) {
    event.relatedTarget.focus();
  } else {
    event.currentTarget.blur();
  }
}

/**
 * Find all focusable elements in a given document context.
 *
 * @param {Element} context
 * @returns {Element[]}
 */
export function focusable(context = document) {
  return $$(SELECTOR_FOCUSABLE, context);
}

/**
 * Make the browser ignore user input events for the given element.
 *
 * @param {Element} element
 * @param {boolean} [shouldIgnoreInput=true]
 */
export function inert(element, shouldIgnoreInput = true) {
  if (shouldIgnoreInput) {
    element.setAttribute('inert', '');
    element.setAttribute('aria-hidden', 'true');

    focusable(element).forEach((element) => {
      element.setAttribute('tabindex', '-1');
      element.addEventListener('focus', preventFocus);
    });
  } else {
    element.removeAttribute('inert');
    element.removeAttribute('aria-hidden');

    focusable(element).forEach((element) => {
      element.removeAttribute('tabindex');
      element.removeEventListener('focus', preventFocus);
    });
  }
}
