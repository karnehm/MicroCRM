import {ApplicationRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  public contactid = '123';
  public _customername = 'Hi';
  public date;
  public description;
  public type;
  public comment;

  constructor(private route: ActivatedRoute, private app: ApplicationRef) { }

  get customername() { return this._customername; }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.contactid = params.contactid;
      this._customername = params.customername;
      this.date = params.date;
      this.description = params.description;
      this.type = params.type;
      this.comment = params.comment;
    });
  }

}
