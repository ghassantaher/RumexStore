import { Component, Input, OnInit } from '@angular/core';
import { IProduct, DisplayTypes } from '../../interfaces';
import { ProductsService } from '../../products/products.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { ProductsActions } from '../../state/products.actions';
import {
  selectCategories,
  selectProducts,
  selectDisplayType,
} from '../../state/products.selectors';
import { ProductsListComponent } from '../products-list/products-list.component';

import { Observable, of, switchMap } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  @Input() categoryId = -1;
  products: ReadonlyArray<IProduct> = [];
  displayType: DisplayTypes = DisplayTypes.DISPLAY_GRID;
  //product$: Observable<IProduct> | undefined;
  products$ = this.store.select(selectProducts(this.categoryId));
  displayType$ = this.store.select(selectDisplayType());

  constructor(
    private productService: ProductsService,
    private store: Store<AppState>,
    // public authService: AuthService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.categoryId = this.route.snapshot.params['categoryId'];
      this.store.dispatch({
        type: ProductsActions.GET_PRODUCT_LIST,
        payload: this.categoryId,
      });
      this.assignProducts();
      this.assignDisplayType();
    });
  }
  assignProducts() {
    this.products$.subscribe((data) => {
      this.products = data;
    });
  }
  assignDisplayType() {
    this.displayType$.subscribe((data) => {
      this.displayType = data;
    });
  }
}
