import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { shopReducer } from './state/shop.reducers';
import { EffectsModule } from '@ngrx/effects';
import { ShopEffects } from './state/shop.effects';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';

import { ShopRoutingModule } from './shop-routing.module';
import { ProductsComponent } from './products/products.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsGridComponent } from './products-grid/products-grid.component';
import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './product/product.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsListComponent,
    ProductsGridComponent,
    ProductComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ScrollingModule,
    ShopRoutingModule,
    MaterialModule,
    SharedModule,
    StoreModule.forFeature('shopState', shopReducer),
    EffectsModule.forFeature([ShopEffects]),
  ],
})
export class ShopModule {}
