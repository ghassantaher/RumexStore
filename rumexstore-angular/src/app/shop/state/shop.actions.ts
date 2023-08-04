import { createAction, props } from '@ngrx/store';
import {
  ICategory,
  IProduct,
  DisplayTypes,
  ICategoriesResponse,
  ICategoryProductsResponse,
} from '../../interfaces';


export enum ShopActionTypes {
  LoadingCategories = '[Shop] Loading Categories',
  LoadCategoriesSuccess = '[Shop] Load Categories Success',
  LoadCategoriesFailure = '[Shop] Load Categories Fail',
  LoadingCategoryProducts = '[Shop] Loading Category Products',
  LoadCategoryProductsSuccess = '[Shop] Load Category Products Success',
  LoadCategoryProductsFailure = '[Shop] Load Category Products Fail',
  LoadingProduct = '[Shop] Loading Product',
  LoadProductSuccess = '[Shop] Load Product Success',
  LoadProductFailure = '[Shop] Load Product Fail',
  SetProductsDisplayType = '[Shop] Set Products Display Type',
  ReadProductsDisplayType = '[Shop] Read Products Display Type',
  SaveProductsDisplayType = '[Shop] Save Products Display Type',
  SaveProductsDisplayTypeSuccess = '[Shop] Save Products Display Type Success',
  SaveProductsDisplayTypeFail = '[Shop] Save Products DisplayType Fail',
  // AddProduct = '[Product Page] Add Product',
  // AddProductSuccess = '[Product API] Add Product Success',
  // AddProductFail = '[Product API] Add Product Fail',
  // FilterBy = '[Product Page] FilterBy',
}

export const loadingCategories = createAction(
  ShopActionTypes.LoadingCategories);

export const loadCategoriesSuccess = createAction(
  ShopActionTypes.LoadCategoriesSuccess,
  props<{ response: ICategoriesResponse }>()
);

export const loadCategoriesFailure = createAction(
  ShopActionTypes.LoadCategoriesFailure,
  props<{ categoriesError: any }>()
);

export const loadingCategoryProducts = createAction(
  ShopActionTypes.LoadingCategoryProducts,
  props<{ categoryId: number }>()
);

export const loadCategoryProductsSuccess = createAction(
  ShopActionTypes.LoadCategoryProductsSuccess,
  props<{ response: ICategoryProductsResponse }>()
);

export const loadCategoryProductsFailure = createAction(
  ShopActionTypes.LoadCategoryProductsFailure,
  props<{ categoryProductsError: any }>()
);


export const loadingProduct = createAction(
  ShopActionTypes.LoadingProduct,
  props<{ productId: number }>()
);

export const setProductsDisplayType = createAction(
  ShopActionTypes.SetProductsDisplayType,
  props<{ displayType: DisplayTypes }>()
);

export const loadProductSuccess = createAction(
  ShopActionTypes.LoadProductSuccess,
  props<{ response: IProduct }>()
);

export const loadProductFailure = createAction(
  ShopActionTypes.LoadProductFailure,
  props<{ productError: any }>()
);


export const saveProductsDisplayType = createAction(
  ShopActionTypes.SaveProductsDisplayType,
  props<{ displayType: DisplayTypes }>()
);

export const readProductsDisplayType = createAction(
  ShopActionTypes.ReadProductsDisplayType,
  props<{ newDisplayType: DisplayTypes }>()
);

export const saveProductsDisplayTypeSuccess = createAction(
  ShopActionTypes.SaveProductsDisplayTypeSuccess,
  props<{ displayType: DisplayTypes }>()
);
