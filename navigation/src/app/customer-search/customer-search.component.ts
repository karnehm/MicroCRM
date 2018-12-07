import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NavigationService} from '../navigation.service';
import {MenuItems} from '../menu-items.enum';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.css']
})
export class CustomerSearchComponent implements OnInit {

  constructor(private router: Router, private navigationService: NavigationService) { }

  ngOnInit() {
  }

  @HostListener('document:paymentEdit', ['$event'])
  onPaymentEdit(event: CustomEvent) {
    this.router.navigate(['/payment/edit', event.detail]);
    this.navigationService.activeNavigation = MenuItems.PAYMENT_EDIT;
  }

  @HostListener('document:customerEdit', ['$event'])
  onCustomerEdit(event: CustomEvent) {
    this.router.navigate(['/customer/edit', {
      customerid: event.detail.customerid,
      firstname: event.detail.firstname,
      lastname: event.detail.lastname,
      gender: event.detail.gender,
      phonenumber: event.detail.phone.number,
      phonetype: event.detail.phone.type
    }]);
    this.navigationService.activeNavigation = MenuItems.CUSTOMER_EDIT;
  }

  @HostListener('document:contactEdit', ['$event'])
  onContactEdit(event: CustomEvent) {
    this.router.navigate(['/contact/edit', event.detail]);
    this.navigationService.activeNavigation = MenuItems.CONTACT_EDIT;
  }

}
