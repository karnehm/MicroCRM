import {Component, Injector, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {forbiddenNameValidator} from './forbidden-name.directive';
import {HttpService} from './http.service';
import {createCustomElement} from '@angular/elements';
import {CreateFormComponent} from './create-form/create-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  constructor(injector: Injector, public popup: HttpService) {
    // Convert `PopupComponent` to a custom element.
    const createForm = createCustomElement(CreateFormComponent, {injector});
    // Register the custom element with the browser.
    customElements.define('customer-edit', createForm);
  }
}
