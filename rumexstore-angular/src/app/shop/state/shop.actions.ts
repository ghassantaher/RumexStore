import { createAction, props } from '@ngrx/store';
import { ICategory, IProduct, DisplayTypes } from '../../interfaces';

export enum ShopActions {
  GET_CATEGORY_LIST = '[Shop] Get Category list',
  SET_CATEGORY_LIST = '[Shop] Set Category list',
  GET_PRODUCT_LIST = '[Shop] Get Product list',
  SET_PRODUCT_LIST = '[Shop] Set Product list',
  SET_DISPLAY_TYPE_STATE = '[Shop] Set Display Type',
  GET_PRODUCT = '[Shop] Get Product',
  SET_PRODUCT = '[Shop] Set Product',
}

export const getCategoryList = createAction(ShopActions.GET_CATEGORY_LIST);

export const setCategoryList = createAction(
  ShopActions.SET_CATEGORY_LIST,
  props<{ categories: ReadonlyArray<ICategory> }>()
);

export const getProductList = createAction(
  ShopActions.GET_PRODUCT_LIST,
  props<{ categoryId: number }>()
);

export const setProductList = createAction(
  ShopActions.SET_PRODUCT_LIST,
  props<{ products: Array<IProduct> }>()
);

export const getProduct = createAction(
  ShopActions.GET_PRODUCT,
  props<{ id: number }>()
);

export const setProduct = createAction(
  ShopActions.SET_PRODUCT,
  props<{ product: IProduct }>()
);

export const setDisplayType = createAction(
  ShopActions.SET_DISPLAY_TYPE_STATE,
  props<{ displayType: DisplayTypes }>()
);