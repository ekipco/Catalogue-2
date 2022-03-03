import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationItem } from '@ekipco/layout';
import { routerSelectors } from '@ekipco/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  navigation$: Observable<NavigationItem[]>;
  activeId: string;

  constructor(public route: ActivatedRoute, private _store: Store) { }

  ngOnInit(): void {
    this.navigation$ = this._store.select(routerSelectors.selectNavigation);
  }

}
