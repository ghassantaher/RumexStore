import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap, switchMap } from 'rxjs/operators';
import { EMPTY, Observable, of, pipe } from 'rxjs';
import { ProductsService } from '../../products/products.service';
import {
  loadingCategories,
  loadCategoriesSuccess,
  loadCategoriesFailure,
  loadingCategoryProducts,
  loadCategoryProductsSuccess,
  loadCategoryProductsFailure,
  loadingProduct,
  loadProductSuccess,
  loadProductFailure,
  setProductsDisplayType,
  saveProductsDisplayTypeSuccess,
  saveProductsDisplayType,
  readProductsDisplayType,
} from './shop.actions';
import { Action } from '@ngrx/store';
import { DisplayTypes, ICategoriesResponse, ICategoryProductsResponse, IProduct } from 'src/app/interfaces';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ShopEffects {
  public loadCategories$ = createEffect(
    (): Observable<Action> =>
      this.actions$.pipe(
        ofType(loadingCategories),
        switchMap(() =>
          // switchMap(() =>
          this.productsService.getCategories().pipe(
            map((response: ICategoriesResponse) =>
              loadCategoriesSuccess({ response })
            ),
            catchError((categoriesError: HttpErrorResponse) =>
              of(loadCategoriesFailure({ categoriesError }))
            )
          )
        )
      )
  );
  public loadCategoryProducts$ = createEffect(
    (): Observable<Action> =>
      this.actions$.pipe(
        ofType(loadingCategoryProducts),
        switchMap((data: { categoryId: number }) =>
          this.productsService.getProducts(data.categoryId.toString()).pipe(
            map((response: ICategoryProductsResponse) =>
              loadCategoryProductsSuccess({ response })
            ),
            catchError((categoryProductsError: HttpErrorResponse) =>
              of(loadCategoryProductsFailure({ categoryProductsError }))
            )
          )
        )
      )
  );
  loadProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadingProduct),
      mergeMap((data: { productId: number }) => {
        return this.productsService.findProductById(data.productId).pipe(
          map((response: IProduct) =>
            loadProductSuccess({
              response,
            })
          ),
          catchError((productError: HttpErrorResponse) =>
            of(loadProductFailure({ productError }))
          )
        );
      })
    );
  });

  setDisplayType$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setProductsDisplayType),
        tap((data: { displayType: DisplayTypes }) =>
          this.productsService.saveProductsDisplayType(data.displayType)
        )
      ),
    { dispatch: false }
  );
  public saveProductsDisplayType$ = createEffect(
    (): Observable<Action> =>
      this.actions$.pipe(
        ofType(saveProductsDisplayType),

        switchMap((data: { displayType: DisplayTypes }) =>
          this.productsService
            .saveProductsDisplayType(data.displayType)
            .pipe(
              map((displayType: DisplayTypes) =>
                saveProductsDisplayTypeSuccess({ displayType })
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
