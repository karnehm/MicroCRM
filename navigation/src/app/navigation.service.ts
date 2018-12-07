import {Injectable} from '@angular/core';
import {MenuItems} from './menu-items.enum';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private _activeNavigation: MenuItems;
  constructor(private route: ActivatedRoute) {
  }

  set activeNavigation(activeNavigation: MenuItems) {
    this._activeNavigation = activeNavigation;
  }

  get activeNavigation() {
    return this._activeNavigation;
  }

  setInitialNavigation(url: string) {
    console.log('set', url)
    switch (url) {
      case 'contact/edit':
        this.activeNavigation = MenuItems.CONTACT_EDIT;
        break;
      case 'contact/view':
        this.activeNavigation = MenuItems.CONTACT_VIEW;
        break;
      case 'customer/edit':
        this.activeNavigation = MenuItems.CUSTOMER_EDIT;
        break;
      case 'customer/search':
        this.activeNavigation = MenuItems.CUSTOMER_SEARCH;
        break;
      case 'payment/edit':
        this.activeNavigation = MenuItems.PAYMENT_EDIT;
        break;
      case 'payment/view':
        this.activeNavigation = MenuItems.PAYMENT_VIEW;
        break;
    }
  }
}
