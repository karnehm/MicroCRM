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

  _customerid = '';
  _gender = '';
  _lastname = '';
  _firstname = '';
  _phonenumber = '';
  _phonetype = '';

  alertMessage: string;
  formGroup: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpService, private app: ChangeDetectorRef) { }

  @Input()
  set customerid(val) {
    this.formGroup.patchValue({id: val});
    this._customerid = val;
  }

  @Input()
  set gender(val) {
    this.formGroup.patchValue({gender: val});
    this._gender = val;
  }

  @Input()
  set lastname(val) {
    this.formGroup.patchValue({name: val});
    this._lastname = val;
  }

  @Input()
  set firstname(val) {
    this.formGroup.patchValue({firstname: val});
    this._firstname = val;
  }

  @Input()
  set phonenumber(val) {
    this.formGroup.patchValue({phone: {number: val}});
    this._phonenumber = val;
  }

  @Input()
  set phonetype(val) {
    this.formGroup.patchValue({phone: {type: val}});
    this._phonetype = val;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.app.detectChanges();
  }

  ngOnInit() {
    this.formGroup  = this.fb.group({
      id: [this._customerid],
      gender: [this._gender || 'Geschlecht', [Validators.required, forbiddenNameValidator(/Geschlecht/i)]],
      name: [this._lastname, Validators.required],
      firstname: [this._firstname, Validators.required],
      phone: this.fb.group({
        number: [this._phonenumber, Validators.required],
        type: [this._phonetype || 'Art', [Validators.required, forbiddenNameValidator(/Art/i)]]
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
