import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { ManagerComponent } from './manager/manager.component';
import { MaterialModule } from '../material.module';
import { ProductsTableComponent } from './products-table/products-table.component';
import { OrdersTableComponent } from './orders-table/orders-table.component';


@NgModule({
  declarations: [ManagerHomeComponent, ManagerComponent, ProductsTableComponent, OrdersTableComponent],
  imports: [CommonModule, ManagerRoutingModule, MaterialModule],
})
export class ManagerModule {}