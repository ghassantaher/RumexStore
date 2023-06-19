import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, tap } from 'rxjs/operators';
import { ProductsService } from '../../products/products.service';
import { loadingProducts, loadProductsSuccess, loadProductsFailure } from './manager.actions';
import { IHttpParams } from 'src/app/interfaces';

import { switchMap, of, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { IProductsResponse } from 'src/app/interfaces';
import { Action } from '@ngrx/store';

@Injectable()
export class ManagerEffects {
  public loadProducts$ = createEffect(
    (): Observable<Action> =>
      this.actions$.pipe(
        ofType(loadingProducts),
        switchMap((payload: { params: IHttpParams }) =>
          // switchMap(() =>
          this.productsService.getAllProducts(payload.params).pipe(
            map((response: IProductsResponse) =>
              loadProductsSuccess({ response })
            ),
            catchError((error: HttpErrorResponse) =>
              of(loadProductsFailure({ error }))
            )
          )
        )
      )
  );

  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}
}
