import { Component, Input, Inject } from '@angular/core';
import { IProduct } from '../../interfaces';
import { APP_CONFIG, appSettings, AppConfig } from '../../app.config';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.scss'],
  providers: [{ provide: APP_CONFIG, useValue: appSettings }],
})
export class ProductsGridComponent {
  constructor(@Inject(APP_CONFIG) public config: AppConfig) {}
  cols = 4;
  length = 0;
  pageIndex = 0;
  pageSize = 20;
  pageSizeOptions: number[] = [5, 10, 20];

  pageEvent!: PageEvent | void;

  @Input() products: ReadonlyArray<IProduct> = [];
  trackSkus(index: number, item: IProduct) {
    return `${item.id}-${index}`;
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
}
