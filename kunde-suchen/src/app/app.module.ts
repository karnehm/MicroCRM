import { BrowserModule } from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { SearchComponent } from './search/search.component';
import { ContactComponent } from './contact/contact.component';
import {FormsModule} from '@angular/forms';
import { ElementZoneStrategyFactory } from 'elements-zone-strategy';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
//  bootstrap: [AppComponent],
  entryComponents: [AppComponent]
})
export class AppModule {
  constructor(private  injector: Injector) { }

  ngDoBootstrap() {
    // Transform AppComponent to Custom Element
    // and include the Injector for Dependency Injection
    const strategyFactory = new ElementZoneStrategyFactory(AppComponent, this.injector);
    const el = createCustomElement(AppComponent, {injector : this.injector, strategyFactory});
    // Register Custom element at browser as <customer-search>
    customElements.define('customer-search', el);
  }
}
