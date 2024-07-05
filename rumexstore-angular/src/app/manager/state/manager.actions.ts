import { Action, createAction, props } from '@ngrx/store';
import {
  IHttpParams,
  IAllProductsResponse,
  IProduct,
} from 'src/app/interfaces';

export enum ManagerActionTypes {
  LoadingAllProducts = '[Manager] Loading All Products',
  LoadAllProductsSuccess = '[Manager] Load All Products Success',
  LoadAllProductsFailure = '[Manager] Load All Products Fail',
  AddProduct = '[Manager] Add Product',
  AddProductSuccess = '[Product API] Add Product Success',
  AddProductFail = '[Product API] Add Product Fail',
  FilterBy = '[Product Page] FilterBy',
}

export const loadingAllProducts = createAction(
  ManagerActionTypes.LoadingAllProducts,
  props<{ params: IHttpParams }>()
);

export const loadAllProductsSuccess = createAction(
  ManagerActionTypes.LoadAllProductsSuccess,
  props<{ response: IAllProductsResponse }>()
);

export const loadAllProductsFailure = createAction(
  ManagerActionTypes.LoadAllProductsFailure,
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