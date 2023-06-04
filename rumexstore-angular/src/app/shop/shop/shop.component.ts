import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../interfaces';
import { DisplayTypes } from '../../interfaces';
import { ProductsService } from '../../products/products.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';

import { ShopActions } from '../state/shop.actions';
import {
  selectCategories,
  selectDisplayType,
} from '../state/shop.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  categories: ReadonlyArray<ICategory> = [];
  categories$ = this.store.select(selectCategories());
  displayType: DisplayTypes = DisplayTypes.DISPLAY_GRID;
  displayType$ = this.store.select(selectDisplayType());

  constructor(
    private productsService: ProductsService,
    private store: Store<AppState>,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.store.dispatch({ type: ShopActions.GET_CATEGORY_LIST });
    this.assignCategories();
    this.store.dispatch({
      type: ShopActions.SET_DISPLAY_TYPE_STATE,
      displayType: DisplayTypes.DISPLAY_GRID,
    });
    this.assignDisplayType();
  }
  assignCategories() {
    this.categories$.subscribe((data) => {
      this.categories = data;
    });
  }
  assignDisplayType() {
    this.displayType$.subscribe((data) => {
      this.displayType = data;
    });
  }
  displayCategories(categoryId: number) {
    this.router.navigate(['/products', categoryId]);
  }
  public get displayTypes(): typeof DisplayTypes {
    return DisplayTypes;
  }
  setDisplayType(displayType: DisplayTypes) {
    this.displayType = displayType;
    this.store.dispatch({
      type: ShopActions.SET_DISPLAY_TYPE_STATE,
      displayType: this.displayType,
    });
  }
}
