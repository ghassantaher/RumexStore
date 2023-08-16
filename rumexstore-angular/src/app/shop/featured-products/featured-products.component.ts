import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import {
  selectDisplayType,
  selectProducts,
  selectFeaturedProductsError,
  selectFeaturedProductsLoading,
  selectFeaturedProductsTotal,
} from '../state/shop.selectors';
import { DisplayTypes, IProduct } from 'src/app/interfaces';
import { Observable, Subscription } from 'rxjs';
import { loadingFeaturedProducts, saveProductsDisplayType } from '../state/shop.actions';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss'],
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {
  featuredProducts: Array<IProduct> = [];
  public featuredProductsTotal!: number;
  public displayType!: DisplayTypes;
  private subscription: Subscription = new Subscription();
  public loading!: boolean;
  public error$!: Observable<any>;

  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.store
      .pipe(select(selectProducts))
      .subscribe((products) => (this.featuredProducts = products));
    this.store
      .pipe(select(selectFeaturedProductsTotal))
      .subscribe((total) => (this.featuredProductsTotal = total));
    this.subscription.add(
      this.store
        .pipe(select(selectFeaturedProductsLoading))
        .subscribe((loading) => {
          this.loading = loading;
        }),
    );
    this.subscription.add(
      this.store.pipe(select(selectDisplayType)).subscribe((displayType) => {
        this.displayType = displayType;
      }),
    );
    this.error$ = this.store.pipe(select(selectFeaturedProductsError));
    this.loadFeaturedProducts();
  }
  public loadFeaturedProducts(): void {
    this.store.dispatch(loadingFeaturedProducts());
  }
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  public get displayTypes(): typeof DisplayTypes {
    return DisplayTypes;
  }

  setDisplayType(displayType: DisplayTypes) {
    this.store.dispatch(saveProductsDisplayType({ displayType: displayType }));
  }
  public retry(): void {
    // this.loadFeaturedProducts();
  }
}
