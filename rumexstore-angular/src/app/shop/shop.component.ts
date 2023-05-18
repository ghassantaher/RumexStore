import { Component, OnInit } from '@angular/core';
import {ICategory} from '../interfaces'
import {ProductsService} from '../products/products.service'
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';

import { CategoryActions } from '../state/category.actions';
import { selectCategories } from '../state/category.selectors';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  // categories: ICategory[];
  categories: ReadonlyArray<ICategory> = [];
  categories$ = this.store.select(selectCategories());

  constructor(
    private productsService: ProductsService,
    private store: Store<AppState>
  ) {}
  ngOnInit(): void {
    this.store.dispatch({ type: CategoryActions.GET_CATEGORY_LIST });
    this.assignCategories();
  }
  assignCategories() {
    this.categories$.subscribe((data) => {
      this.categories = data;
    });
  }
}
