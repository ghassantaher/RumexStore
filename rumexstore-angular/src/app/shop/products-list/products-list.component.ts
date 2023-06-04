import { Component, Input, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { APP_CONFIG, appSettings, AppConfig } from '../../app.config';

import {IProduct} from '../../interfaces'
export interface AddressType {
    firstLine: string;
    city: string;
};

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  providers: [{ provide: APP_CONFIG, useValue: appSettings }],
})
export class ProductsListComponent {
  @Input() products: ReadonlyArray<IProduct> = [];

  constructor(
    private router: Router,
    @Inject(APP_CONFIG) public config: AppConfig
  ) {}
  navigateToProductDetails(productId: number) {
    this.router.navigate(['/product', productId]);
  }
  // listItemSelected(data: IProduct) {
  //   // this.bottomsheet.open(ActionsBottomsheetComponent);
  //   //console.log(data);
  // }
  selectUser(data: IProduct) {
    // this.userEmitter.emit(user);
  }
}