import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { ProductsService } from '../../products/products.service';
import { ShopActions } from './shop.actions';

@Injectable()
export class ShopEffects {
  // get list of categories in the external API
  // set retrieved categories list in the state
  getCategories$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ShopActions.GET_CATEGORY_LIST),
        mergeMap(() =>
          this.productsService.getCategories().pipe(
            map((categories) => ({
              type: ShopActions.SET_CATEGORY_LIST,
              categories,
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
        ofType(ShopActions.SET_DISPLAY_TYPE_STATE),
        tap(() => console.log('Action One Dispatched'))
      ),
    { dispatch: false }
    // FeatureActions.actionOne is not dispatched
  );
  getProducts$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ShopActions.GET_PRODUCT_LIST),
        mergeMap((data: { type: string; payload: string }) =>
          this.productsService.getProducts(data.payload).pipe(
            map((products) => ({
              type: ShopActions.SET_PRODUCT_LIST,
              products,
            })),
            catchError(() => EMPTY)
          )
        )
      );
    },
    { dispatch: true }
  );
  getProduct$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ShopActions.GET_PRODUCT),
        mergeMap((data: { type: string; payload: string }) =>
          this.productsService.getProduct(data.payload).pipe(
            map((product) => ({
              type: ShopActions.SET_PRODUCT,
              product,
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
