import { Component, OnInit } from '@angular/core';
import { ICategory } from '../interfaces';
import { selectCategories, selectCategoriesError, selectCategoriesLoading, selectCategoriesTotal } from '../shop/state/shop.selectors';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from '../state/app.state';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  categories: Array<ICategory> = [];
  public categoriesTotal!: number;
  private subscription: Subscription = new Subscription();
  public loading!: boolean;
  public error$!: Observable<any>;

  public rowHeight!: string;
  public breakpoint!: number;
  public isMobile!: boolean;
  public isTablet!: boolean;

  protected stackoverflowUrl: string =
    'https://stackoverflow.com/users/1791913/faisal?tab=profile';
  protected linkedinUrl: string = 'https://www.linkedin.com/in/mohammadfaysal/';
  protected fiverrUrl: string = 'https://www.fiverr.com/faisalmuhammad_';
  protected facebookUrl: string = 'https://www.facebook.com/phaysall';
  protected twitterUrl: string = 'https://twitter.com/faisssallll';
  protected githubUrl: string = 'https://github.com/faisalmuhammad';
  protected googleUrl: string = 'https://plus.google.com/+MuhammadFaisal04';
  constructor(private store: Store<AppState>) {}
  onResize(event: any) {
    if (event.target.innerWidth > 992) {
      this.breakpoint = 6;
      this.rowHeight = '55px';
      this.isMobile = false;
      this.isTablet = false;
    } else if (event.target.innerWidth > 576) {
      this.breakpoint = 3;
      this.rowHeight = '50px';
      this.isMobile = false;
      this.isTablet = true;
    } else {
      this.breakpoint = 1;
      this.rowHeight = '60px';
      this.isMobile = true;
      this.isTablet = false;
    }
  }
  ngOnInit() {
    if (window.innerWidth > 992) {
      this.breakpoint = 6;
      this.rowHeight = '55px';
      this.isMobile = false;
      this.isTablet = false;
    } else if (window.innerWidth > 576) {
      this.breakpoint = 3;
      this.rowHeight = '50px';
      this.isMobile = false;
      this.isTablet = true;
    } else {
      this.breakpoint = 1;
      this.rowHeight = '60px';
      this.isMobile = true;
      this.isTablet = false;
    }
    this.store
      .pipe(select(selectCategories))
      .subscribe((categories) => (this.categories = categories));
    this.store
      .pipe(select(selectCategoriesTotal))
      .subscribe((total) => (this.categoriesTotal = total));
    this.subscription.add(
      this.store.pipe(select(selectCategoriesLoading)).subscribe((loading) => {
        this.loading = loading;
      }),
    );
    this.error$ = this.store.pipe(select(selectCategoriesError));
  }
}
