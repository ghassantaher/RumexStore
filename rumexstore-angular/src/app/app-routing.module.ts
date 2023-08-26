import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ShopComponent } from './shop/shop/shop.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

const routes: Routes = [
  // { path: '', redirectTo: '/shop', pathMatch: 'full' },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  // { path: 'cart', component: CartDetailComponent },
  // { path: 'checkout', component: CheckoutComponent },
  {
    path: 'manager',
    loadChildren: () =>
      import('./manager/manager.module').then((m) => m.ManagerModule),
    // canLoad: [AuthGuard],
  },
  {
    path: 'shop',
    loadChildren: () =>
      import('./shop/shop.module').then((m) => m.ShopModule),
    // canLoad: [AuthGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
