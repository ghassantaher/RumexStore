import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ManagerActions } from '../state/manager.actions';
import { IProduct } from '../../interfaces';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { selectProducts } from '../state/manager.selectors';
import { APP_CONFIG, appSettings, AppConfig } from '../../app.config';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
  providers: [{ provide: APP_CONFIG, useValue: appSettings }],
})
export class ProductsTableComponent implements OnInit {
  public displayedColumns: string[] = [
    'imageUrl',
    'name',
    'price',
    'categoryName',
    'description',
    'buttons',
  ];

  public products!: MatTableDataSource<IProduct>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  products$ = this.store.select(selectProducts());
  constructor(
    @Inject(APP_CONFIG) public config: AppConfig,
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    var pageEvent = new PageEvent();
    pageEvent.pageIndex = 0;
    pageEvent.pageSize = 10;
    this.getData(pageEvent);
  }
  getData(pageEvent: PageEvent) {
    this.store.dispatch({
      type: ManagerActions.GET_PRODUCT_LIST,
      payload: pageEvent,
    });
    this.assignProducts();
  }
  assignProducts() {
    this.products$.subscribe(
      (data) => {
        if (this.paginator) {
          this.paginator.length = data.length;
          this.paginator.pageIndex = data.pageIndex;
          this.paginator.pageSize = data.pageSize;
          this.products = new MatTableDataSource<IProduct>(data.products);
        } 
      },
      (error) => console.error(error)
    );
  }
  trackSkus(index: number, item: IProduct) {
    return `${item.id}-${index}`;
  }
  deleteProduct(id: number) {}
}
