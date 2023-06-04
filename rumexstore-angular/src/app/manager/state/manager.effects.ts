import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { ProductsService } from '../../products/products.service';
import { ManagerActions } from './manager.actions';

@Injectable()
export class ManagerEffects {
  getProducts$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ManagerActions.GET_PRODUCT_LIST),
        mergeMap((data: { type: string; payload: string }) =>
          this.productsService.getAllProducts().pipe(
            map((products) => ({
              type: ManagerActions.SET_PRODUCT_LIST,
              products,
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
