import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { categoryReducer } from './state/category.reducers';
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
import { productReducer } from './state/products.reducers';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsListComponent,
    ProductsGridComponent,
    ProductComponent,
    FeaturedProductsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ScrollingModule,
    ShopRoutingModule,
    MaterialModule,
    SharedModule,
    StoreModule.forFeature('categoryState', categoryReducer),
    StoreModule.forFeature('productState', productReducer),
    EffectsModule.forFeature([ShopEffects]),
  ],
})
export class ShopModule {}
