import {html, PolymerElement} from '@polymer/polymer/polymer-element';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-checkbox/paper-checkbox';

/**
 * `payment-create`
 * Es handelt sich um das Customer Element des Use-Cases Zahlung Anlegen/Bearbeiten aus MicroCRM
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */

class PaymentEdit extends PolymerElement {


  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Zahlung</h2>
      <paper-input label="Id" value="{{paymentId}}" disabled></paper-input>
      <paper-input label="Kunde (Name, Vorname)"    value="{{customername}}"></paper-input> 
      <paper-input label="Rechnungsnummer"          value="{{bill}}" allowed-pattern="[0-9]"></paper-input>
      <paper-input label="Betrag in €"              value="{{amount}}"  allowed-pattern="[0123456789€,]"></paper-input>
      <paper-checkbox checked="{{mwstfree}}">MwSt Befreit</paper-checkbox>
      <paper-input label="Rechnungsdatum"           value="{{amountdate}}"></paper-input>
      <paper-input label="Zahlungs Eingangsdatum"   value="{{paydate}}"></paper-input>
      <!-- Buttons to Save and Cancle -->
      <paper-button on-click="save"   raised>Speichern</paper-button>
      <paper-button on-click="cancle" raised>Abbrechen</paper-button>
    `;
  }

  static get properties() {
    return {
        paymentId: {
            type:Number,
            value:undefined
        },
        customername: String,
        bill: String,
        amount: String,
        mwstfree: Boolean,
        amountdate: String,
        paydate: String
        }
    };

    get SERVER_URL(){ return 'http://localhost:3000/payment'}
    get url() { return this.paymentId ? this.SERVER_URL + '/' + this.paymentId : this.SERVER_URL; }
    get method() { return this.paymentId ? 'PUT' : 'POST'; }
    get data() {
        return {
            id: this.paymentId,
            customer: this.customername,
            bill: this.bill,
            amount: this.amount,
            mwstfree: this.mwstfree,
            amountdate: this.amountdate,
            paydate: this.paydate
        };}

    save() {
        this.sendRequest(this.url, this.method, JSON.stringify(this.data));
        document.dispatchEvent(new CustomEvent('paymentUpdate',
            { detail: {customername: this.customername}, bubbles: true}));
    }

    sendRequest(url, method, data) {
        var shouldBeAsync = true;
        var request = new XMLHttpRequest();
        request.onload = function () {
            switch (request.status) {
                case 201:
                    window.alert('Die Zahlung wurde angelegt');
                    break;
                case 200:
                    window.alert('Die Zahlung wurde aktualisiert');
                    break;
                default:
                    window.alert('Es ist ein Fehler aufgetreten.' +  request.status);
                    break;
            }
        };
        request.open(method, url, shouldBeAsync);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(data);
    }
}

window.customElements.define('payment-create', PaymentEdit);
