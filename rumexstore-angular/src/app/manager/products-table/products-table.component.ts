import { Component, OnInit, Inject, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { AddProduct, loadingAllProducts } from '../state/manager.actions';
import { IProduct } from '../../interfaces';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { selectProducts, selectProductsError, selectProductsLoading, 
  selectProductsTotal } from '../state/manager.selectors';
import { MatSort, Sort } from '@angular/material/sort';
import { APP_CONFIG, appSettings, AppConfig } from '../../app.config';
import { Observable, Subject, Subscription, debounceTime, distinctUntilChanged, map, merge, tap } from 'rxjs';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
  providers: [{ provide: APP_CONFIG, useValue: appSettings }],
})
export class ProductsTableComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public displayedColumns: string[] = [
    'id',
    'imageUrl',
    'details.modelName',
    'currentPrice',
    'categoryNavigation.categoryName',
    'details.description',
    'buttons',
  ];

  public dataSource!: MatTableDataSource<IProduct>;
  public noData: IProduct[] = [<IProduct>{}];
  public defaultSort: Sort = { active: 'id', direction: 'asc' };
  public productsTotal!: number;
  private subscription: Subscription = new Subscription();
  public loading!: boolean;
  public error$!: Observable<any>;
  public filterSubject = new Subject<string>();
  public filter: string = '';
  private result: any;
  defaultFilterColumn: string = 'details.modelName';

  constructor(
    @Inject(APP_CONFIG) public config: AppConfig,
    private store: Store<AppState>) { }

  public ngOnInit(): void {
    this.store
      .pipe(select(selectProducts))
      .subscribe((products) => this.initializeData(products));
    this.store
      .pipe(select(selectProductsTotal))
      .subscribe((total) => (this.productsTotal = total));
    this.subscription.add(
      this.store.pipe(select(selectProductsLoading)).subscribe((loading) => {
        if (loading) {
          this.dataSource = new MatTableDataSource(this.noData);
        }
        this.loading = loading;
      })
    );
    this.error$ = this.store.pipe(select(selectProductsError));
    this.loadProducts();
  }
  addProduct(attendee: IProduct) {
    this.store.dispatch(new AddProduct(attendee));
  }
  public ngAfterViewInit(): void {
    let filter$ = this.filterSubject.pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap((value: string) => {
        this.paginator.pageIndex = 0;
        this.filter = value;
      })
    );

    let sort$ = this.sort.sortChange.pipe(
      tap(() => (this.paginator.pageIndex = 0))
    );

    this.subscription.add(
      merge(filter$, sort$, this.paginator.page)
        .pipe(tap(() => this.loadProducts()))
        .subscribe()
    );
  }
  public loadProducts(): void {
    this.store.dispatch(
      loadingAllProducts({
        params: {
          filterColumn: this.defaultFilterColumn.toLocaleLowerCase(),
          filterQuery: this.filter.toLocaleLowerCase(),
          pageIndex: this.paginator?.pageIndex ?? 0,
          pageSize: this.paginator?.pageSize ?? 10,
          sortDirection: this.sort?.direction ?? 'asc',
          sortField: this.sort?.active ?? 'id',
        },
      })
    );
  }


  trackSkus(index: number, item: IProduct) {
    return `${item.id}-${index}`;
  }
  deleteProduct(id: number) {}
  private initializeData(products: IProduct[]): void {
    this.dataSource = new MatTableDataSource(
      products.length ? products : this.noData
    );
  }
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  public retry(): void {
    this.loadProducts();
  }
}
