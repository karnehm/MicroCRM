import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.css']
})
export class ContactViewComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  @HostListener('document:contactEdit', ['$event'])
  onPaymentEdit(event: CustomEvent) {
    console.log(event.detail);
    this.router.navigate(['/contact/edit', event.detail]);
  }
}
