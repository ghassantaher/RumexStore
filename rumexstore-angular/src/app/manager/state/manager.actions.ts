import { createAction, props } from '@ngrx/store';
import { IProduct } from '../../interfaces';


export enum ManagerActions {
  GET_PRODUCT_LIST = '[Manager] Get Product list',
  SET_PRODUCT_LIST = '[Manager] Set Product list',
}
export const getProductList = createAction(
  ManagerActions.GET_PRODUCT_LIST,
  props<{ categoryId: number }>()
);

export const setProductList = createAction(
  ManagerActions.SET_PRODUCT_LIST,
  props<{ products: Array<IProduct> }>()
);