import { createReducer, on } from "@ngrx/store";
import { initialProductState, productAdapter } from "./shop.state";
import * as shopActions from '../state/shop.actions';

export const categoryProductsReducer = createReducer(
  initialProductState,
  on(shopActions.loadingCategoryProducts, (state) => ({
    ...state,
    categoryProductsLoading: true,
  })),
  on(shopActions.loadCategoryProductsSuccess, (state, { response }) =>
    productAdapter.setAll(response.products, {
      ...state,
      categoryProductsError: null,
      categoryProductsLoading: false,
      categoryProductsTotal: response.total,
    })
  ),
  on(shopActions.loadCategoryProductsFailure, (state) =>
    productAdapter.removeAll({
      ...state,
      categoryProductsError: true,
      categoryProductsLoading: false,
      categoryProductsTotal: 0,
    })
  ),
  on(shopActions.loadingProduct, (state) => ({
    ...state,
    productLoading: true,
  })),

  on(shopActions.loadProductSuccess, (state, { response }) =>
    productAdapter.upsertOne(response, {
      ...state,
      productLoading: false,
      productError: null,
    })
  ),
  on(shopActions.loadProductFailure, (state) => ({
    ...state,
    productLoading: false,
    productError: true,
  })),
  on(shopActions.saveProductsDisplayTypeSuccess, (state, { displayType }) => ({
    ...state,
    displayType: displayType,
  }))
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  productAdapter.getSelectors();
