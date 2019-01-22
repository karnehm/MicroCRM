import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {NavigationService} from '../navigation.service';
import {MenuItems} from '../menu-items.enum';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements AfterViewInit {

  public menuItems = MenuItems;

  constructor(private navigationService: NavigationService, private router: Router) { }

  ngAfterViewInit() {

  }

  public isActive(item: MenuItems) {
    return this.navigationService.activeNavigation === item ? 'active' : '';
  }

  public setActive(item: MenuItems) {
    this.navigationService.activeNavigation = item;
  }
}
