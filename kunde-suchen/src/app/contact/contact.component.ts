import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @Input() name: string;
  @Input() firstname: string;
  @Input() identifyer: string;
  @Output() editClick: EventEmitter<string> = new EventEmitter<string>();
  @Output() paymentClick: EventEmitter<string> = new EventEmitter<string>();
  @Output() contactClick: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onEditClick() {
    this.editClick.next(this.identifyer);
  }

  onPaymentClick() {
    this.paymentClick.next(this.identifyer);
  }

  onContactClick() {
    this.contactClick.next(this.identifyer);
  }
}
