import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { ProductsService } from '../../products/products.service';
import { ManagerActions } from './manager.actions';
import { PageEvent } from '@angular/material/paginator';


@Injectable()
export class ManagerEffects {
  getProducts$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ManagerActions.GET_PRODUCT_LIST),
        mergeMap((data: { type: string; payload: PageEvent }) =>
          this.productsService.getAllProducts(data.payload).pipe(
            map((productsWithInfo) => ({
              type: ManagerActions.SET_PRODUCT_LIST,
              productsWithInfo,
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
