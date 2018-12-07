import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomerEditComponent} from './customer-edit/customer-edit.component';
import {CustomerSearchComponent} from './customer-search/customer-search.component';
import {ContactEditComponent} from './contact-edit/contact-edit.component';
import {ContactViewComponent} from './contact-view/contact-view.component';
import {PaymentEditComponent} from './payment-edit/payment-edit.component';
import {PaymentViewComponent} from './payment-view/payment-view.component';

const routes: Routes = [
  {
    path: 'customer/edit',
    component: CustomerEditComponent
  }, {
    path: 'customer/search',
    component: CustomerSearchComponent
  }, {
    path: 'contact/edit',
    component: ContactEditComponent
  }, {
    path: 'contact/view',
    component: ContactViewComponent
  }, {
    path: 'payment/edit',
    component: PaymentEditComponent
  }, {
    path: 'payment/view',
    component: PaymentViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
