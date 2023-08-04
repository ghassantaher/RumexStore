import { Component, Input, Inject, OnInit } from '@angular/core';
import { IProduct } from '../../interfaces';
import { APP_CONFIG, appSettings, AppConfig } from '../../app.config';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.scss'],
  providers: [{ provide: APP_CONFIG, useValue: appSettings }],
})
export class ProductsGridComponent implements OnInit {
  constructor(
    @Inject(APP_CONFIG) public config: AppConfig,
    private router: Router
  ) {}
  cols = 4;
  length = 0;
  pageIndex = 0;
  pageSize = 20;
  pageSizeOptions: number[] = [5, 10, 20];
  public breakpoint!: number;
  public gridClass: string = 'lg';

  pageEvent!: PageEvent | void;

  @Input() products: ReadonlyArray<IProduct> = [];
  trackSkus(index: number, item: IProduct) {
    return `${item.id}-${index}`;
  }
  ngOnInit() {
    if (window.innerWidth > 1400) {
      this.breakpoint = 5;
      this.gridClass = 'xxl';
    } else if (window.innerWidth > 1200) {
      this.breakpoint = 4;
      this.gridClass = 'xl';
    } else if (window.innerWidth > 992) {
      this.breakpoint = 4;
      this.gridClass = 'lg';
    } else if (window.innerWidth > 768) {
      this.breakpoint = 3;
      this.gridClass = 'md';
    } else if (window.innerWidth > 576) {
      this.breakpoint = 2;
      this.gridClass = 'sm';
    } else if (window.innerWidth > 320) {
      this.breakpoint = 1;
      this.gridClass = 'xs';
    } else {
      this.breakpoint = 1;
      this.gridClass = 'xxs';
    }
  }
  onResize(event: any) {
    if (event.target.innerWidth > 1400) {
      this.breakpoint = 5;
      this.gridClass = 'xxl';
    } else if (event.target.innerWidth > 1200) {
      this.breakpoint = 4;
      this.gridClass = 'xl';
    } else if (event.target.innerWidth > 992) {
      this.breakpoint = 4;
      this.gridClass = 'lg';
    } else if (event.target.innerWidth > 768) {
      this.breakpoint = 3;
      this.gridClass = 'md';
    } else if (event.target.innerWidth > 576) {
      this.breakpoint = 2;
      this.gridClass = 'sm';
    } else if (event.target.innerWidth > 320) {
      this.breakpoint = 1;
      this.gridClass = 'xs';
    } else {
      this.breakpoint = 1;
      this.gridClass = 'xxs';
    }
  }
  showText() {
    if (window.innerWidth > 577) {
      return true;
    } else {
      return false;
    }
  }
  private getProducts(page: number, pageSize: number) {
    return this.products;
    // this.skus.getSkus(page, pageSize).subscribe(
    //   (skus) => {
    //     this.products = skus;
    //     this.length = skus[0].__collectionMeta.recordCount;
    //   },
    //   (err) => this.router.navigateByUrl('/error')
    // );
  }
  getNextPage(event: PageEvent) {
    this.getProducts(event.pageIndex + 1, event.pageSize);
  }
  navigateToProductDetails(productId: number) {
    this.router.navigate(['/product', productId]);
  }
}
