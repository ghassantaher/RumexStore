import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, tap } from 'rxjs/operators';
import { ProductsService } from '../../products/products.service';
import {
  loadingAllProducts,
  loadAllProductsSuccess,
  loadAllProductsFailure,
} from './manager.actions';
import { IHttpParams } from 'src/app/interfaces';

import { switchMap, of, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { IAllProductsResponse } from 'src/app/interfaces';
import { Action } from '@ngrx/store';

@Injectable()
export class ManagerEffects {
  public loadAllProducts$ = createEffect(
    (): Observable<Action> =>
      this.actions$.pipe(
        ofType(loadingAllProducts),
        switchMap((payload: { params: IHttpParams }) =>
          this.productsService.getAllProducts(payload.params).pipe(
            map((response: IAllProductsResponse) =>
              loadAllProductsSuccess({ response })
            ),
            catchError((error: HttpErrorResponse) =>
              of(loadAllProductsFailure({ error }))
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
