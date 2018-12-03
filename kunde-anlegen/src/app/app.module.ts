import { BrowserModule } from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { CreateFormComponent } from './create-form/create-form.component';
import {HttpService} from './http.service';
import {createCustomElement} from '@angular/elements';
import { ElementZoneStrategyFactory } from 'elements-zone-strategy';

@NgModule({
  declarations: [
    CreateFormComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HttpService],
   // bootstrap: [CreateFormComponent],
  entryComponents: [CreateFormComponent]
})
export class AppModule {
  constructor(private injector: Injector, public http: HttpService) {
    // Convert `PopupComponent` to a custom element.
    const strategyFactory = new ElementZoneStrategyFactory(CreateFormComponent, this.injector);
    const createForm = createCustomElement(CreateFormComponent, {injector: this.injector, strategyFactory});
    // Register the custom element with the browser.
    customElements.define('customer-edit', createForm);
  }
  ngDoBootstrap() {
  }
}
