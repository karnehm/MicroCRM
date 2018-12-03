import {ApplicationRef, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {HttpService} from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../../node_modules/bootstrap/dist/css/bootstrap.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  @Output() customer: EventEmitter<string> = new EventEmitter<string>();
  @Output() payment: EventEmitter<string> = new EventEmitter<string>();
  @Output() contact: EventEmitter<string> = new EventEmitter<string>();

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

  onEdit(identifyer: string) {
    this.customer.next(identifyer);
  }

  onPayment(identifyer: string) {
    this.payment.next(identifyer);
  }

  onContact(identifyer: string) {
    this.contact.next(identifyer);
  }

}
