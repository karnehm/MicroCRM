import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {HttpService} from './http.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {forbiddenNameValidator} from './forbidden-name.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit, OnChanges {

  _customerid = '-1';
  @Input() gender = '';
  @Input() lastname = '';
  @Input() firstname = '';
  @Input() phonenumber = '';
  @Input() phonetype = '';

  alertMessage: string;
  formGroup: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpService, private app: ChangeDetectorRef) { }

  @Input()
  set customerid(val) {
    this.formGroup.patchValue({id:val});
    this._customerid = val;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.app.detectChanges();
  }

  ngOnInit() {
    this.formGroup  = this.fb.group({
      id: [this._customerid],
      gender: [this.gender || 'Geschlecht', [Validators.required, forbiddenNameValidator(/Geschlecht/i)]],
      name: [this.lastname, Validators.required],
      firstname: [this.firstname, Validators.required],
      phone: this.fb.group({
        number: [this.phonenumber, Validators.required],
        type: [this.phonetype || 'Art', [Validators.required, forbiddenNameValidator(/Art/i)]]
      })
    });
  }

  get getGender() { return this.formGroup.get('gender'); }
  get getLastname() { return this.formGroup.get('name'); }
  get getFirstname() {return this.formGroup.get('firstname'); }
  get getPhoneNumber() { return this.formGroup.get('phone').get('number'); }
  get getPhoneType() { return this.formGroup.get('phone').get('type'); }

  sendClick() {
    this.http.addKunde(this.formGroup.value)
      .subscribe(
        x => {
          this.alertMessage = 'Speichern erfolgreich!';
          const event = new CustomEvent('customerUpdate');
          document.dispatchEvent(event);
          this.formGroup.reset();
        },
        e => {
          this.alertMessage = 'Es gab Probleme. Wir entschuldigen';
        });
  }

  cancleClick() {
    this.formGroup.reset();
  }


}
