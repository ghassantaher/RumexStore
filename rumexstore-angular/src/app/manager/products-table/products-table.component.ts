import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductsActions } from '../../state/products.actions';
import { IProduct} from '../../interfaces';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { selectProducts } from '../../state/products.selectors';
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

  products$ = this.store.select(selectProducts(0));
  constructor(
    @Inject(APP_CONFIG) public config: AppConfig,
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.store.dispatch({
      type: ProductsActions.GET_PRODUCT_LIST,
      payload: 0,
    });
    this.assignProducts();
  }
  assignProducts() {
    this.products$.subscribe((data) => {
      this.products = new MatTableDataSource<IProduct>(data);
      this.products.paginator = this.paginator;
    }, error => console.error(error));
  }
  trackSkus(index: number, item: IProduct) {
    return `${item.id}-${index}`;
  }
  deleteProduct(id: number) {
  }
}
