import {ApplicationRef, Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {

  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  public searchValue: string;
  constructor() { }

  onKeyup(e: KeyboardEvent) {
    this.search.next(this.searchValue);
  }
}
