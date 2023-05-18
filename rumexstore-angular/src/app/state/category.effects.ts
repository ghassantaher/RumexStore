import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { ProductsService } from '../products/products.service';
import { CategoryActions } from './category.actions';

@Injectable()
export class CategoryEffects {
  // get list of categories in the external API
  // set retrieved categories list in the state
  getCategories$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CategoryActions.GET_CATEGORY_LIST),
        mergeMap(() =>
          this.productsService.getCategories().pipe(
            map((categories) => ({
              type: CategoryActions.SET_CATEGORY_LIST,
              categories,
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
