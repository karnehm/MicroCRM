import { BrowserModule } from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { CreateFormComponent } from './create-form/create-form.component';
import {HttpService} from './http.service';
import {createCustomElement} from '@angular/elements';

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
    let createForm = createCustomElement(CreateFormComponent, {injector: this.injector});
    // Register the custom element with the browser.
    customElements.define('app-create-form', createForm);
  }
  ngDoBootstrap() {
  }
}
