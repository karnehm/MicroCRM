import {ApplicationRef, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {HttpService} from './http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../../node_modules/bootstrap/dist/css/bootstrap.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  private searchValue: string;
  public customers: Customer[];

  constructor(private http: HttpService, private app: ApplicationRef) {  }


  ngOnInit() {
    this.updateCustomers();
    document.addEventListener('customerUpdate',
      (e: CustomEvent) => this.updateCustomers(e.detail ? e.detail.customername : null));
  }

  updateCustomers(search?: string) {
    this.searchValue = search;
    this.http.getContacts(this.searchValue).subscribe((customers: Customer[]) => {
      this.customers = customers;
    });
  }

  onSearch(search: string) {
    this.updateCustomers(search);
  }

  onEdit(customer: Customer) {
    console.log('Customer Edit');
    this.raiseEvent('customerEdit', customer);
  }

  onPayment(customer: Customer) {
    console.log('Payment Edit');
    this.raiseEvent('paymentEdit', customer)
  }

  onContact(customer: Customer) {
    console.log('Contact Edit');
    this.raiseEvent('contactEdit', customer);
  }

  private raiseEvent(event: string, customer: Customer) {
    const customEvent = new CustomEvent(event, {
      detail: {
        customerid: customer.id,
        lastname: customer.name,
        firstname: customer.firstname,
        customername: customer.firstname + ' ' + customer.name,
        gender: customer.gender,
        phone: {
          number: customer.phone.number,
          type: customer.phone.type
        }
      },
      bubbles: true
    });
    document.dispatchEvent(customEvent);
  }
}
