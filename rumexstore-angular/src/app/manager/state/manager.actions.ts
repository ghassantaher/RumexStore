import { createAction, props } from '@ngrx/store';
import { IProductsWithInfo } from '../../interfaces';
import { PageEvent } from '@angular/material/paginator';


export enum ManagerActions {
  GET_PRODUCT_LIST = '[Manager] Get Product list',
  SET_PRODUCT_LIST = '[Manager] Set Product list',
}
export const getProductList = createAction(
  ManagerActions.GET_PRODUCT_LIST,
  props<{ pageEvent: PageEvent }>()
);

export const setProductList = createAction(
  ManagerActions.SET_PRODUCT_LIST,
  props<{ productsWithInfo: IProductsWithInfo }>()
);