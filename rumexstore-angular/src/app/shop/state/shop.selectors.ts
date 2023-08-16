import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { DisplayTypes, ICategory } from '../../interfaces';
import {
  CategoryState,
  ProductState,
  categoryAdapter,
  productAdapter,
} from './shop.state';
import * as shopReducers from './category.reducers';
import * as categoryReducers from './category-products.reducers';

export const {
  selectIds: _selectCategoriesDataIds,
  selectEntities: _selectCategoriesEntities,
  selectAll: _selectAllCategories,
  selectTotal: _selectCategoriesTotal,
} = categoryAdapter.getSelectors();

export const {
  selectIds: _selectCategoryProductsDataIds,
  selectEntities: _selectCategoryProductsEntities,
  selectAll: _selectAllCategoryProducts,
  selectTotal: _selectCategoryProductsTotal,
} = productAdapter.getSelectors();

export const selectCategoryState =
  createFeatureSelector<CategoryState>('categoryState');

export const selectProductIds = createSelector(
  selectCategoryState,
  _selectCategoriesDataIds
);
export const selectCategoriesError = createSelector(
  selectCategoryState,
  (state: CategoryState): boolean => state.categoriesError
);

export const selectCategoriesLoading = createSelector(
  selectCategoryState,
  (state: CategoryState): boolean => state.categoriesLoading
);

export const selectCategoriesTotal = createSelector(
  selectCategoryState,
  (state: CategoryState): number => state.categoriesTotal
);
export const selectCategories = createSelector(
  selectCategoryState,
  shopReducers.selectAll
);

export const selectProductState = createFeatureSelector<ProductState>(
  'productState'
);

export const selectCategoryProductIds = createSelector(
  selectProductState,
  _selectCategoryProductsDataIds
);
export const selectCategoryProductsError = createSelector(
  selectProductState,
  (state: ProductState): boolean => state.categoryProductsError
);

export const selectCategoryProductsLoading = createSelector(
  selectProductState,
  (state: ProductState): boolean => state.categoryProductsLoading
);

export const selectCategoryProductsTotal = createSelector(
  selectProductState,
  (state: ProductState): number => state.categoryProductsTotal
);
export const selectCategoryProducts = createSelector(
  selectProductState,
  categoryReducers.selectAll
);

export const selectFeaturedProductsError = createSelector(
  selectProductState,
  (state: ProductState): boolean => state.featuredProductsError,
);

export const selectFeaturedProductsLoading = createSelector(
  selectProductState,
  (state: ProductState): boolean => state.featuredProductsLoading,
);

export const selectFeaturedProductsTotal = createSelector(
  selectProductState,
  (state: ProductState): number => state.featuredProductsTotal,
);
export const selectFeaturedProducts = createSelector(
  selectProductState,
  categoryReducers.selectAll,
);

export const selectProductById = (productId: number) =>
  createSelector(
    selectProductState,
    (productState) => productState.entities[productId]
  );
export const selectProductError = createSelector(
  selectProductState,
  (state: ProductState): boolean => state.productError
);

export const selectProductLoading = createSelector(
  selectProductState,
  (state: ProductState): boolean => state.productLoading
);
export const selectDisplayType = createSelector(
  selectProductState,
  (state: ProductState): DisplayTypes => state.displayType
);

