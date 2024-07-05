import { Component, Input, Inject, OnInit } from '@angular/core';
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
export class ProductsListComponent implements OnInit {
  @Input() products: ReadonlyArray<IProduct> = [];

  constructor(
    private router: Router,
    @Inject(APP_CONFIG) public config: AppConfig
  ) {}
  public breakpoint!: number;
  public productInfoColSpan!: number;
  public rowHeight!: string;
  ngOnInit() {
    if (window.innerWidth > 576) {
      this.breakpoint = 4;
      this.productInfoColSpan = 3;
      this.rowHeight='250px';
    } else {
      this.breakpoint = 3;
      this.productInfoColSpan = 2;
      this.rowHeight='175px';
    }
  }
  onResize(event: any) {
    if (event.target.innerWidth > 576) {
      this.breakpoint = 4;
      this.productInfoColSpan = 3;
      this.rowHeight = '250px';
    } else {
      this.breakpoint = 3;
      this.productInfoColSpan = 2;
      this.rowHeight = '175px';
    }
  }
  showText() {
    if (window.innerWidth > 768) {
      return true;
    } else {
      return false;
    }
  }

  navigateToProductDetails(productId: number) {
    this.router.navigate(['/product', productId]);
  }
}
