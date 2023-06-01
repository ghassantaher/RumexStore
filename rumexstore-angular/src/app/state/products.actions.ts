// import { createActionGroup, emptyProps, props } from '@ngrx/store';

// export const CategoryActions = createActionGroup({
//   source: 'Category',
//   events: {
//     'Load Categorys': emptyProps(),
//     'Load Categorys Success': props<{ data: unknown }>(),
//     'Load Categorys Failure': props<{ error: unknown }>(),
//   }
// });
import { createAction, props } from '@ngrx/store';
import { ICategory, IProduct, DisplayTypes } from '../interfaces';


export enum ProductsActions {
  GET_CATEGORY_LIST = '[Category] Get Category list',
  SET_CATEGORY_LIST = '[Category] Set Category list',
  GET_PRODUCT_LIST = '[Product] Get Product list',
  SET_PRODUCT_LIST = '[Product] Set Product list',
  SET_DISPLAY_TYPE_STATE = '[Shop] Set Display Type',
  GET_PRODUCT = '[Product] Get Product',
  SET_PRODUCT = '[Product] Set Product',
}

export const getCategoryList = createAction(ProductsActions.GET_CATEGORY_LIST);

export const setCategoryList = createAction(
  ProductsActions.SET_CATEGORY_LIST,
  props<{ categories: ReadonlyArray<ICategory> }>()
);

export const getProductList = createAction(
  ProductsActions.GET_PRODUCT_LIST,
  props<{ categoryId: number }>()
);

export const setProductList = createAction(
  ProductsActions.SET_PRODUCT_LIST,
  props<{ products: Array<IProduct> }>()
);

export const getProduct = createAction(
  ProductsActions.GET_PRODUCT,
  props<{ id: number }>()
);

export const setProduct = createAction(
  ProductsActions.SET_PRODUCT,
  props<{ product: IProduct }>()
);

export const setDisplayType = createAction(
  ProductsActions.SET_DISPLAY_TYPE_STATE,
  props<{ displayType: DisplayTypes }>()
);