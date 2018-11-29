import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../http.service';
import {forbiddenNameValidator} from '../forbidden-name.directive';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.css', './create-form.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default
})
export class CreateFormComponent implements OnInit {

  @Input() kundennummer = '';
  @Input() gender = '';
  @Input() kundeName = '';
  @Input() kundeVorname = '';
  @Input() telefonnummer = '';
  @Input() telefontyp = '';
  @Input() update: Observable<any>;
  @Output() saved: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancled: EventEmitter<any> = new EventEmitter<any>();

  alertMessage: string;

  customerIdId = 'id';
  customerIdPlacehoder = 'Kundennummer';

  genderOptions: string[] = ['Herr', 'Frau'];
  genderPlaceholder = 'Geschlecht';
  genderId = 'sex';

  nameId = 'name';
  namePlaceholder = 'Name';

  vnameId = 'vname';
  vnamePlaceholder = 'Vorname';

  phoneNumberId = 'phoneNumber';
  phoneNumberPlaceholder = 'Telefonnummer';

  phoneTypeOptions: string[] = ['Mobil', 'Privat', 'Geschäftlich'];
  phoneTypePlaceholder = 'Art';
  phoneTypeId = 'phoneType';

  formGroup: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpService, private app: ApplicationRef) { }

  ngOnInit() {
    this.formGroup  = this.fb.group({
      id: [this.kundennummer],
      gender: [this.gender || this.genderPlaceholder, [Validators.required, forbiddenNameValidator(/Geschlecht/i)]],
      name: [this.kundeName, Validators.required],
      vorname: [this.kundeVorname, Validators.required],
      phone: this.fb.group({
        number: [this.telefonnummer, Validators.required],
        type: [this.telefontyp || this.phoneTypePlaceholder, [Validators.required, forbiddenNameValidator(/Art/i)]]
      })
    });

    if (this.update) {
      this.update.subscribe(x => this.updateStatus());
    }
  }

  get getGender() { return this.formGroup.get('gender'); }
  get getName() { return this.formGroup.get('name'); }
  get getVorname() {return this.formGroup.get('vorname'); }
  get getPhoneNumber() { return this.formGroup.get('phone').get('number'); }
  get getPhoneType() { return this.formGroup.get('phone').get('type'); }

  sendClick() {
    this.http.addKunde(this.formGroup.value)
      .subscribe(
        x => {
          this.alertMessage = 'Speichern erfolgreich!';
          this.saved.next(this.formGroup.value);
          this.formGroup.reset();
        },
        e => {
          this.alertMessage = 'Es gab Probleme. Wir entschuldigen';
        });
  }

  cancleClick() {
    this.formGroup.reset();
    this.cancled.next();
  }

  updateStatus() {
    this.app.tick();
  }

}
