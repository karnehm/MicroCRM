import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Route, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-payment-edit',
  templateUrl: './payment-edit.component.html',
  styleUrls: ['./payment-edit.component.css']
})
export class PaymentEditComponent implements OnInit {

  public customerName: string;
  public id;
  public bill;
  public amount;
  public mwstfree;
  public amountdate;
  public paydate;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.customerName = params.customername;
      this.id = params.paymentid;
      this.bill = params.bill;
      this.amount = params.amount;
      this.mwstfree = params.mwstfree;
      this.amountdate = params.amountdate;
      this.paydate = params.paydate;
    });
  }

}
