import {Component, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnChanges {
  private customerid;
  private lastname;
  private firstname;
  private gender;
  private phonetype;
  private phonenumber;

  constructor(private route: ActivatedRoute) { }

  ngOnChanges() {
    this.route.params.subscribe((params) => {
      this.customerid = params.customerid;
      this.lastname = params.lastname;
      this.firstname = params.firstname;
      this.gender = params.gender;
      this.phonetype = params.phonetype;
      this.phonenumber = params.phonenumber;
    });
  }

}
