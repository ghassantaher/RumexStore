import { Component, OnInit, Inject, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IProduct } from '../../interfaces';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { loadingProduct } from '../state/shop.actions';
import { Location } from '@angular/common';
import { APP_CONFIG, appSettings, AppConfig } from '../../app.config';
import { selectProductById, selectProductError, selectProductLoading } from '../state/shop.selectors';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [{ provide: APP_CONFIG, useValue: appSettings }],
})
export class ProductComponent implements OnInit, OnDestroy {
  id: number = -1;
  product: IProduct | undefined = undefined;
  private subscription: Subscription = new Subscription();
  loading: boolean = false;
  public error$!: Observable<any>;

  constructor(
    @Inject(APP_CONFIG) public config: AppConfig,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      this.id = this.route.snapshot.params['id'];
      this.store
        .pipe(select(selectProductById(this.id)))
        .subscribe((product) => (this.product = product));
      this.subscription.add(
        this.store.pipe(select(selectProductLoading)).subscribe((loading) => {
          this.loading = loading;
        })
      );
      this.error$ = this.store.pipe(select(selectProductError));
      this.loadProduct();
    });
  }
  public loadProduct(): void {
    this.store.dispatch(loadingProduct({ productId: this.id }));
  }
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  public retry(): void {
    this.loadProduct();
  }
  addItemToCart() {
  }
  goBack() {
    this.location.back();
  }
}
