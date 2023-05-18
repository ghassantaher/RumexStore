import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { categoryReducer } from '../state/category.reducers';
import { EffectsModule } from '@ngrx/effects';
import { CategoryEffects } from '../state/category.effects';

import { ShopRoutingModule } from './shop-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ShopRoutingModule,
    StoreModule.forFeature('categoryState', categoryReducer),
    EffectsModule.forFeature([CategoryEffects]),
  ],
})
export class ShopModule {}
