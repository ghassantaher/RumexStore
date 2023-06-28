import { Component, Input, OnInit } from '@angular/core';
import { IProduct, DisplayTypes } from '../../interfaces';
// import { ProductsService } from '../../products/products.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { ShopActions2 } from '../state/shop.actions';
import { selectProducts2, selectDisplayType2 } from '../state/shop.selectors';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  @Input() categoryId = -1;
  products2: ReadonlyArray<IProduct> = [];
  displayType2: DisplayTypes = DisplayTypes.DISPLAY_GRID;
  products2$ = this.store.select(selectProducts2(this.categoryId));
  displayType2$ = this.store.select(selectDisplayType2());

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.categoryId = this.route.snapshot.params['categoryId'];
      this.store.dispatch({
        type: ShopActions2.GET_PRODUCT_LIST,
        payload: this.categoryId,
      });
      this.assignProducts();
      this.assignDisplayType();
    });
  }
  assignProducts() {
    this.products2$.subscribe((data) => {
      this.products2 = data;
    });
  }
  assignDisplayType() {
    this.displayType2$.subscribe((data) => {
      this.displayType2 = data;
    });
  }
}
