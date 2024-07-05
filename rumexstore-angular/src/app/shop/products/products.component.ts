import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IProduct, DisplayTypes } from '../../interfaces';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { loadingCategoryProducts, saveProductsDisplayType } from '../state/shop.actions';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  selectProducts,
  selectCategoryProductsError,
  selectCategoryProductsLoading,
  selectCategoryProductsTotal,
  selectDisplayType,
} from '../state/shop.selectors';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() categoryId = -1;
  categoryProducts: Array<IProduct> = [];
  public categoryProductsTotal!: number;
  public displayType!: DisplayTypes;
  private subscription: Subscription = new Subscription();
  public loading!: boolean;
  public error$!: Observable<any>;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.categoryId = this.route.snapshot.params['categoryId'];
      this.store
        .pipe(select(selectProducts))
        .subscribe((products) => (this.categoryProducts = products));
      this.store
        .pipe(select(selectCategoryProductsTotal))
        .subscribe((total) => (this.categoryProductsTotal = total));
      this.subscription.add(
        this.store
          .pipe(select(selectCategoryProductsLoading))
          .subscribe((loading) => {
            this.loading = loading;
          })
      );
      this.subscription.add(
        this.store.pipe(select(selectDisplayType)).subscribe((displayType) => {
          this.displayType = displayType;
        })
      );
      this.error$ = this.store.pipe(select(selectCategoryProductsError));
      this.loadCategoryProducts();
    });
  }
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  public retry(): void {
    // this.loadProducts();
  }
  public loadCategoryProducts(): void {
    this.store.dispatch(
      loadingCategoryProducts({ categoryId: this.categoryId })
    );
  }
  public ngAfterViewInit(): void {
    // this.loadCategoryProducts();
  }
  public get displayTypes(): typeof DisplayTypes {
    return DisplayTypes;
  }

  setDisplayType(displayType: DisplayTypes) {
    this.store.dispatch(saveProductsDisplayType({ displayType: displayType }));
  }
}
