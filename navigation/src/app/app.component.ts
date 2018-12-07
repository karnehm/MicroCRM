import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {NavigationService} from './navigation.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private navigationService: NavigationService, private router: Router) { }

  ngOnInit(): void {
    const splittedUrl = window.location.href.replace( /http:\/\/([a-z])*:[0-9]*/g , '').split('/');
    let url: string;
    if (splittedUrl.length > 2) {
      url = splittedUrl[1] + '/' + splittedUrl[2].split(';')[0];
    } else {
      url = '';
    }
    this.navigationService.setInitialNavigation(url);
  }
}
