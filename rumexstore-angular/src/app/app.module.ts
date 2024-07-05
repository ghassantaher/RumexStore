import { HttpClientModule } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ShopModule } from './shop/shop.module';
import { ManagerModule } from './manager/manager.module';
import { ShopComponent } from './shop/shop/shop.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SharedModule } from './shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { DemoPopupComponent } from './demo-popup/demo-popup.component';
// import { FormsModule } from '@angular/forms';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { SnackBarDemoAcknowledgementComponent } from './snack-bar-demo-acknowledgement/snack-bar-demo-acknowledgement.component';
import { SnackBarDemoAcknowledgementSnackComponent } from './snack-bar-demo-acknowledgement-snack/snack-bar-demo-acknowledgement-snack.component';

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    PageNotFoundComponent,
    FooterComponent,
    DemoPopupComponent,
    PrivacyPolicyComponent,
    SnackBarDemoAcknowledgementComponent,
    SnackBarDemoAcknowledgementSnackComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ShopModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    ManagerModule,
    // FormsModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  // entryComponents: [DemoPopupComponent],
})
export class AppModule {}
