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
  public gridClass: string = 'g4';

  pageEvent!: PageEvent | void;

  @Input() products: ReadonlyArray<IProduct> = [];
  trackSkus(index: number, item: IProduct) {
    return `${item.id}-${index}`;
  }
  ngOnInit() {
    if (window.innerWidth > 1080) {
      this.breakpoint = 4;
      this.gridClass = 'g4';
    } else if (window.innerWidth > 850) {
      this.breakpoint = 3;
      this.gridClass = 'g3';
    } else if (window.innerWidth > 600) {
      this.breakpoint = 2;
      this.gridClass = 'g2';
    } else {
      this.breakpoint = 1;
      this.gridClass = 'g1';
    }
  }
  onResize(event: any) {
    if (event.target.innerWidth > 1080) {
      this.breakpoint = 4;
      this.gridClass = 'g4';
    } else if (event.target.innerWidth > 850) {
      this.breakpoint = 3;
      this.gridClass = 'g3';
    } else if (event.target.innerWidth > 600) {
      this.breakpoint = 2;
      this.gridClass = 'g2';
    } else {
      this.breakpoint = 1;
      this.gridClass = 'g1';
    }
  }
  private getProducts2(page: number, pageSize: number) {
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
    this.getProducts2(event.pageIndex + 1, event.pageSize);
  }
  navigateToProductDetails(productId: number) {
    this.router.navigate(['/product', productId]);
  }
}
