import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../interfaces';
import { DisplayTypes } from '../../interfaces';
import { ProductsService } from '../../products/products.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';

import { ShopActions2 } from '../state/shop.actions';
import { selectCategories2, selectDisplayType2 } from '../state/shop.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  categories2: ReadonlyArray<ICategory> = [];
  categories2$ = this.store.select(selectCategories2());
  displayType2: DisplayTypes = DisplayTypes.DISPLAY_GRID;
  displayType2$ = this.store.select(selectDisplayType2());

  constructor(
    private productsService: ProductsService,
    private store: Store<AppState>,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.store.dispatch({ type: ShopActions2.GET_CATEGORY_LIST });
    this.assignCategories();
    this.store.dispatch({
      type: ShopActions2.SET_DISPLAY_TYPE_STATE,
      displayType2: DisplayTypes.DISPLAY_GRID,
    });
    this.assignDisplayType();
  }
  assignCategories() {
    this.categories2$.subscribe((data) => {
      this.categories2 = data;
    });
  }
  assignDisplayType() {
    this.displayType2$.subscribe((data) => {
      this.displayType2 = data;
    });
  }
  displayCategories(categoryId: number) {
    this.router.navigate(['/products', categoryId]);
  }
  public get displayTypes(): typeof DisplayTypes {
    return DisplayTypes;
  }
  setDisplayType2(displayType2: DisplayTypes) {
    this.displayType2 = displayType2;
    this.store.dispatch({
      type: ShopActions2.SET_DISPLAY_TYPE_STATE,
      displayType2: this.displayType2,
    });
  }
}
