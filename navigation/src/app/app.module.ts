import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavigationComponent} from './navigation/navigation.component';
import {CustomerEditComponent} from './customer-edit/customer-edit.component';
import {CustomerSearchComponent} from './customer-search/customer-search.component';
import {ContactEditComponent} from './contact-edit/contact-edit.component';
import {ContactViewComponent} from './contact-view/contact-view.component';
import {PaymentViewComponent} from './payment-view/payment-view.component';
import {PaymentEditComponent} from './payment-edit/payment-edit.component';


import '../assets/contact-view/contact-view';
import '../assets/customer-edit/customer-edit';
import '../assets/customer-search/customer-search';
import '../assets/payment-view/payment-view';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    CustomerEditComponent,
    CustomerSearchComponent,
    ContactEditComponent,
    ContactViewComponent,
    PaymentViewComponent,
    PaymentEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
