import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @Input() customer: Customer;
  @Output() editClick: EventEmitter<Customer> = new EventEmitter<Customer>();
  @Output() paymentClick: EventEmitter<Customer> = new EventEmitter<Customer>();
  @Output() contactClick: EventEmitter<Customer> = new EventEmitter<Customer>();

  constructor() { }

  ngOnInit() {
  }

  onEditClick() {
    this.editClick.next(this.customer);
  }

  onPaymentClick() {
    this.paymentClick.next(this.customer);
  }

  onContactClick() {
    this.contactClick.next(this.customer);
  }
}
