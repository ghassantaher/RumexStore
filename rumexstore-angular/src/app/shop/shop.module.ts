import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { categoryReducer } from '../state/products.reducers';
import { EffectsModule } from '@ngrx/effects';
import { CategoryEffects } from '../state/products.effects';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';

import { ShopRoutingModule } from './shop-routing.module';
import { ProductsComponent } from './products/products.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsGridComponent } from './products-grid/products-grid.component';
import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './product/product.component';

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
    ShopRoutingModule,
    MaterialModule,
    SharedModule,
    StoreModule.forFeature('categoryState', categoryReducer),
    EffectsModule.forFeature([CategoryEffects]),
  ],
})
export class ShopModule {}
