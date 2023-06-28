import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { ProductsService } from '../../products/products.service';
import { ShopActions2 } from './shop.actions';

@Injectable()
export class ShopEffects {
  // get list of categories2 in the external API
  // set retrieved categories2 list in the state
  getCategories2$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ShopActions2.GET_CATEGORY_LIST),
        mergeMap(() =>
          this.productsService.getCategories2().pipe(
            map((categories2) => ({
              type: ShopActions2.SET_CATEGORY_LIST,
              categories2,
            })),
            catchError(() => EMPTY)
          )
        )
      );
    },
    { dispatch: true }
  );
  getDisplayType$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ShopActions2.SET_DISPLAY_TYPE_STATE),
        tap(() => console.log('Action One Dispatched'))
      ),
    { dispatch: false }
    // FeatureActions.actionOne is not dispatched
  );
  getProducts2$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ShopActions2.GET_PRODUCT_LIST),
        mergeMap((data: { type: string; payload: string }) =>
          this.productsService.getProducts2(data.payload).pipe(
            map((products2) => ({
              type: ShopActions2.SET_PRODUCT_LIST,
              products2,
            })),
            catchError(() => EMPTY)
          )
        )
      );
    },
    { dispatch: true }
  );
  getProduct2$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ShopActions2.GET_PRODUCT),
        mergeMap((data: { type: string; payload: string }) =>
          this.productsService.getProduct2(data.payload).pipe(
            map((product2) => ({
              type: ShopActions2.SET_PRODUCT,
              product2,
            })),
            catchError(() => EMPTY)
          )
        )
      );
    },
    { dispatch: true }
  );

  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}
}
