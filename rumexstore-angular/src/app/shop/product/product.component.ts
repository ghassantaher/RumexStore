import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IProduct } from '../../interfaces';
import { selectProduct2 } from '../state/shop.selectors';

// import { ProductsService } from '../../products/products.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { ShopActions2 } from '../state/shop.actions';
import { Location } from '@angular/common';
import { APP_CONFIG, appSettings, AppConfig } from '../../app.config';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [{ provide: APP_CONFIG, useValue: appSettings }],
})
export class ProductComponent implements OnInit {
  id: number = -1;
  product2: IProduct | undefined = undefined;
  product2$ = this.store.select(selectProduct2(this.id));

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
      this.store.dispatch({
        type: ShopActions2.GET_PRODUCT,
        payload: this.id,
      });
      this.assignProduct();
    });
  }
  assignProduct() {
    this.product2$.subscribe((data) => {
      this.product2 = data;
    });
  }
  addItemToCart() {
    // if (this.quantity > 0) {
    //   if (this.cart.orderId == '') {
    //     this.orders
    //       .createOrder()
    //       .pipe(
    //         mergeMap((order: Order) => {
    //           this.cart.orderId = order.id || '';
    //           return this.lineItems.createLineItem({
    //             orderId: order.id,
    //             name: this.product.name,
    //             imageUrl: this.product.imageUrl,
    //             quantity: this.quantity,
    //             skuCode: this.product.code,
    //           });
    //         })
    //       )
    //       .subscribe(
    //         () => {
    //           this.cart.incrementItemCount(this.quantity);
    //           this.showSuccessSnackBar();
    //         },
    //         (err) => this.showErrorSnackBar()
    //       );
    //   } else {
    //     this.lineItems
    //       .createLineItem({
    //         orderId: this.cart.orderId,
    //         name: this.product.name,
    //         imageUrl: this.product.imageUrl,
    //         quantity: this.quantity,
    //         skuCode: this.product.code,
    //       })
    //       .subscribe(
    //         () => {
    //           this.cart.incrementItemCount(this.quantity);
    //           this.showSuccessSnackBar();
    //         },
    //         (err) => this.showErrorSnackBar()
    //       );
    //   }
    // } else {
    //   this.snackBar.open('Select a quantity greater than 0.', 'Close', {
    //     duration: 8000,
    //   });
    // }
  }
  goBack() {
    this.location.back();
  }
}
