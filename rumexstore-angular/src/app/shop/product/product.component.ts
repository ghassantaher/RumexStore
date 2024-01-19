import { Component, OnInit, Inject, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IImage, IProduct } from '../../interfaces';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { loadingProduct } from '../state/shop.actions';
import { Location } from '@angular/common';
import { APP_CONFIG, appSettings, AppConfig } from '../../app.config';
import { selectProductById, selectProductError, selectProductLoading } from '../state/shop.selectors';
import { Observable, Subscription } from 'rxjs';
import { ProductsService } from '../../products/products.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [{ provide: APP_CONFIG, useValue: appSettings }],
})
export class ProductComponent implements OnInit, OnDestroy {
  id: number = -1;
  image: IImage | undefined = undefined;
  imageUrl:SafeUrl = '';
  product: IProduct | undefined = undefined;
  private subscription: Subscription = new Subscription();
  loading: boolean = false;
  public error$!: Observable<any>;

  constructor(
    @Inject(APP_CONFIG) public config: AppConfig,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private location: Location,
    private productsService: ProductsService,
    private sanitizer: DomSanitizer,
  ) {}
  public subscriptSizing!: 'fixed' | 'dynamic';

  ngOnInit(): void {
    if (window.innerWidth > 576) {
      this.subscriptSizing = 'fixed';
    } else {
      this.subscriptSizing = 'dynamic';
    }

    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      this.id = this.route.snapshot.params['id'];
      this.store
        .pipe(select(selectProductById(this.id)))
        .subscribe((product) => {
          this.product = product;
          if (product) {
            this.productsService
              .getImage(product?.imageUrl!)
              .subscribe((imageUrl) => {

                
                // let unsafeImageUrl = URL.createObjectURL(image.image);
                // this.imageUrl = URL.createObjectURL(image.image);
                this.imageUrl =
                  this.sanitizer.bypassSecurityTrustUrl(imageUrl.imageUrl);
                // this.image = image;
              });
          }
        });
      this.subscription.add(
        this.store.pipe(select(selectProductLoading)).subscribe((loading) => {
          this.loading = loading;
        }),
      );
      this.error$ = this.store.pipe(select(selectProductError));
      this.loadProduct();
    });
  }
  onResize(event: any) {
    if (event.target.innerWidth > 576) {
      this.subscriptSizing = 'fixed';
    } else {
      this.subscriptSizing = 'dynamic';
    }
  }
  showText() {
    if (window.innerWidth >= 576) {
      return true;
    } else {
      return false;
    }
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
  addItemToCart() {}
  goBack() {
    this.location.back();
  }
}
