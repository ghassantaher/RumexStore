import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import {ProductsComponent} from './products/products.component'
import { ShopComponent } from './shop/shop.component';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';

// const routes: Routes = [
//   { path: '', redirectTo: '/shop', pathMatch: 'full' },
//   { path: 'shop', component: ShopComponent },
//   {
//     path: 'products/:categoryId',
//     component: ProductsComponent,
//   },
//   // { path: 'products', component: ProductsComponent },
// ];
const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
    children: [
      { path: '', redirectTo: '/shop/featured', pathMatch: 'full' },
      // { path: 'shop', component: ShopComponent },
      { path: 'product/:id', component: ProductComponent },
      {
        path: 'products/:categoryId',
        component: ProductsComponent,
      },
      { path: 'featured', component: FeaturedProductsComponent },
      // { path: 'home', component: ManagerHomeComponent },
      // { path: 'products', component: ProductsTableComponent },
      // { path: 'orders', component: OrdersTableComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }



