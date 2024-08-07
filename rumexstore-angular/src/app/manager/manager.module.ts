import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { managerReducer } from './state/manager.reducers';
import { EffectsModule } from '@ngrx/effects';
import { ManagerEffects } from './state/manager.effects';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { ManagerComponent } from './manager/manager.component';
import { MaterialModule } from '../material.module';
import { ProductsTableComponent } from './products-table/products-table.component';
import { OrdersTableComponent } from './orders-table/orders-table.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ManagerHomeComponent,
    ManagerComponent,
    ProductsTableComponent,
    OrdersTableComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ManagerRoutingModule,
    MaterialModule,
    StoreModule.forFeature('managerState', managerReducer),
    EffectsModule.forFeature([ManagerEffects]),
  ],
})
export class ManagerModule {}
