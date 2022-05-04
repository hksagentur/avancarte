import {define, defineAsync} from 'wicked-elements';

import {Card} from './components/card.js';
import {DisclosureButton} from './components/disclosure-button.js';
import {DisclosureMenu} from './components/disclosure-menu.js';

/**
 * Main entry point of the application.
 *
 * @param {string} [environment='modern'] The name of the current browser environment.
 * @returns {void}
 */
export default function main(environment = 'modern') {
  const {documentElement} = document;

  // Note: Avoiding `DOMTokenList.replace` which is not supported in IE 11.
  documentElement.classList.remove('no-js');
  documentElement.classList.add('has-js');
  documentElement.classList.add(`is-${environment}`);

  define('[data-component="card"]', Card);

  define('[data-component="disclosure-button"]', DisclosureButton);
  define('[data-component="disclosure-menu"]', DisclosureMenu);

  defineAsync('[data-component="carousel"]', () => (
    import('./components/carousel.js')
  ));
}
