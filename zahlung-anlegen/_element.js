import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `payment-create`
 * Es handelt sich um das Customer Element des Use-Cases Zahlung Anlegen/Bearbeiten aus MicroCRM
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class PaymentCreate extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'payment-create',
      },
    };
  }
}

window.customElements.define('payment-create', PaymentCreate);
