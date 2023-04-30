import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { ManagerComponent } from './manager/manager.component';
import { OrdersTableComponent } from './orders-table/orders-table.component'
import { ProductsTableComponent } from './products-table/products-table.component';
const routes: Routes = [
{
path: '',
component: ManagerComponent,
children: [
{ path: '', redirectTo: '/manager/home', pathMatch: 'full' },
{ path: 'home', component: ManagerHomeComponent },
{ path: 'products', component: ProductsTableComponent },
{ path: 'orders', component: OrdersTableComponent },
],
},
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
