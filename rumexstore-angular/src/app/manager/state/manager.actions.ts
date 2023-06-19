import { Action, createAction, props } from '@ngrx/store';
import { IHttpParams, IProductsResponse, IProduct } from 'src/app/interfaces';

export enum ManagerActionTypes {
  LoadingProducts = '[Products Page] Loading Products',
  LoadProductsSuccess = '[Products Page] Load Products Success',
  LoadProductsFailure = '[Products Page] Load Products Fail',
  AddProduct = '[Product Page] Add Product',
  AddProductSuccess = '[Product API] Add Product Success',
  AddProductFail = '[Product API] Add Product Fail',
  FilterBy = '[Product Page] FilterBy',
}

export const loadingProducts = createAction(
  ManagerActionTypes.LoadingProducts,
  props<{ params: IHttpParams }>()
);

export const loadProductsSuccess = createAction(
  ManagerActionTypes.LoadProductsSuccess,
  props<{ response: IProductsResponse }>()
);

export const loadProductsFailure = createAction(
  ManagerActionTypes.LoadProductsFailure,
  props<{ error: any }>()
);

export class AddProduct implements Action {
  readonly type = ManagerActionTypes.AddProduct;
  constructor(public payload: IProduct) {}
}

export class AddProductSuccess implements Action {
  readonly type = ManagerActionTypes.AddProductSuccess;
  constructor(public payload: IProduct) {}
}

export class AddProductFail implements Action {
  readonly type = ManagerActionTypes.AddProductFail;
  constructor(public payload: any) {}
}

export class FilterBy implements Action {
  readonly type = ManagerActionTypes.FilterBy;
  constructor(public payload: string) {}
}