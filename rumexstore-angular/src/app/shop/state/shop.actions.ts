import { createAction, props } from '@ngrx/store';
import { ICategory, IProduct, DisplayTypes } from '../../interfaces';

export enum ShopActions2 {
  GET_CATEGORY_LIST = '[Shop] Get Category list',
  SET_CATEGORY_LIST = '[Shop] Set Category list',
  GET_PRODUCT_LIST = '[Shop] Get Product list',
  SET_PRODUCT_LIST = '[Shop] Set Product list',
  SET_DISPLAY_TYPE_STATE = '[Shop] Set Display Type',
  GET_PRODUCT = '[Shop] Get Product',
  SET_PRODUCT = '[Shop] Set Product',
}

export const getCategoryList2 = createAction(ShopActions2.GET_CATEGORY_LIST);

export const setCategoryList2 = createAction(
  ShopActions2.SET_CATEGORY_LIST,
  props<{ categories2: ReadonlyArray<ICategory> }>()
);

export const getProductList = createAction(
  ShopActions2.GET_PRODUCT_LIST,
  props<{ categoryId: number }>()
);

export const setProductList2 = createAction(
  ShopActions2.SET_PRODUCT_LIST,
  props<{ products2: Array<IProduct> }>()
);

export const getProduct2 = createAction(
  ShopActions2.GET_PRODUCT,
  props<{ id: number }>()
);

export const setProduct2 = createAction(
  ShopActions2.SET_PRODUCT,
  props<{ product2: IProduct }>()
);

export const setDisplayType2 = createAction(
  ShopActions2.SET_DISPLAY_TYPE_STATE,
  props<{ displayType2: DisplayTypes }>()
);