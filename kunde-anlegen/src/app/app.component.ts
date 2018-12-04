import {ApplicationRef, Component, EventEmitter, Injector, Input, OnInit, Output} from '@angular/core';
import {HttpService} from './http.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {forbiddenNameValidator} from './forbidden-name.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {

  @Input() customerid = '';
  @Input() gender = '';
  @Input() lastname = '';
  @Input() firstname = '';
  @Input() phonenumber = '';
  @Input() phonetype = '';
  @Output() customerUpdate: EventEmitter<any> = new EventEmitter<any>();
  @Output() CustomerCanceled: EventEmitter<any> = new EventEmitter<any>();

  alertMessage: string;
  formGroup: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpService, private app: ApplicationRef) { }

  ngOnInit() {
    this.formGroup  = this.fb.group({
      customerId: [this.customerid],
      gender: [this.gender || 'Geschlecht', [Validators.required, forbiddenNameValidator(/Geschlecht/i)]],
      lastname: [this.lastname, Validators.required],
      firstname: [this.firstname, Validators.required],
      phone: this.fb.group({
        number: [this.phonenumber, Validators.required],
        type: [this.phonetype || 'Art', [Validators.required, forbiddenNameValidator(/Art/i)]]
      })
    });
  }

  get getGender() { return this.formGroup.get('gender'); }
  get getLastname() { return this.formGroup.get('lastname'); }
  get getFirstname() {return this.formGroup.get('firstname'); }
  get getPhoneNumber() { return this.formGroup.get('phone').get('number'); }
  get getPhoneType() { return this.formGroup.get('phone').get('type'); }

  sendClick() {
    this.http.addKunde(this.formGroup.value)
      .subscribe(
        x => {
          this.alertMessage = 'Speichern erfolgreich!';
          this.customerUpdate.next(this.formGroup.value);
          this.formGroup.reset();
        },
        e => {
          this.alertMessage = 'Es gab Probleme. Wir entschuldigen';
        });
  }

  cancleClick() {
    this.formGroup.reset();
    this.CustomerCanceled.next();
  }
}
