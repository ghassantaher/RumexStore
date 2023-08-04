import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ICategory } from '../../interfaces';
import { DisplayTypes } from '../../interfaces';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';

import { loadingCategories } from '../state/shop.actions';
import { selectCategories, selectCategoriesError, selectCategoriesLoading, selectCategoriesTotal} from '../state/shop.selectors';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit, OnDestroy {
  categories: Array<ICategory> = [];
  public categoriesTotal!: number;
  private subscription: Subscription = new Subscription();
  public loading!: boolean;
  public error$!: Observable<any>;

  constructor(private store: Store<AppState>, private router: Router) {}
  ngOnInit(): void {
    this.store
      .pipe(select(selectCategories))
      .subscribe((categories) => (this.categories = categories));
    this.store
      .pipe(select(selectCategoriesTotal))
      .subscribe((total) => (this.categoriesTotal = total));
    this.subscription.add(
      this.store.pipe(select(selectCategoriesLoading)).subscribe((loading) => {
        this.loading = loading;
      })
    );
    this.error$ = this.store.pipe(select(selectCategoriesError));
    this.loadCategories();
  }
  displayCategories(categoryId: number) {
    this.router.navigate(['/products', categoryId]);
  }
  public get displayTypes(): typeof DisplayTypes {
    return DisplayTypes;
  }
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  public retry(): void {
    this.loadCategories();
  }
  public loadCategories(): void {
    this.store.dispatch(loadingCategories());
  }
}
