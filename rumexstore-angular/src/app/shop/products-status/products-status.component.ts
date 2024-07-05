import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DisplayTypes } from 'src/app/interfaces';
import { AppState } from 'src/app/state/app.state';
import { selectDisplayType } from '../state/shop.selectors';
import { saveProductsDisplayType } from '../state/shop.actions';

@Component({
  selector: 'app-products-status',
  templateUrl: './products-status.component.html',
  styleUrls: ['./products-status.component.scss'],
})
export class ProductsStatusComponent implements OnInit, OnDestroy {
  @Input() msg: string = '';
  @Input() title: string = '';
  public isMobile!: boolean;
  public displayType!: DisplayTypes;
  private subscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    if (window.innerWidth > 576) {
      this.isMobile = false;
    } else {
      this.isMobile = true;
      this.setDisplayType(DisplayTypes.DISPLAY_GRID);
    }
    this.subscription.add(
      this.store.pipe(select(selectDisplayType)).subscribe((displayType) => {
        this.displayType = displayType;
      }),
    );
  }
  onResize(event: any) {
    if (event.target.innerWidth > 576) {
      this.isMobile = false;
    } else {
      this.isMobile = true;
      this.setDisplayType(DisplayTypes.DISPLAY_GRID);
    }
  }
  InnerWidth() {
    return window.innerWidth;
  }
  InnerHeight() {
    return window.innerHeight;
  }
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  public get displayTypes(): typeof DisplayTypes {
    return DisplayTypes;
  }

  setDisplayType(displayType: DisplayTypes) {
    this.store.dispatch(saveProductsDisplayType({ displayType: displayType }));
  }
}
