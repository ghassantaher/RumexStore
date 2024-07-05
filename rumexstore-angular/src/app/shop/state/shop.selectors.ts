import { createSelector, createFeatureSelector } from '@ngrx/store';
import { DisplayTypes, ICategory } from '../../interfaces';
import {
  CategoryState,
  ProductState,
  categoryAdapter,
  productAdapter,
} from './shop.state';
import * as categoryReducers from './category.reducers';
import * as productReducers from './products.reducers';

export const {
  selectIds: _selectCategoriesDataIds,
  selectEntities: _selectCategoriesEntities,
  selectAll: _selectAllCategories,
  selectTotal: _selectCategoriesTotal,
} = categoryAdapter.getSelectors();

export const {
  selectIds: _selectProductsDataIds,
  selectEntities: _selectProductsEntities,
  selectAll: _selectAllProducts,
  selectTotal: _selectProductsTotal,
} = productAdapter.getSelectors();

export const selectCategoryState =
  createFeatureSelector<CategoryState>('categoryState');

export const selectCategoriesIds = createSelector(
  selectCategoryState,
  _selectCategoriesDataIds,
);
export const selectCategoriesError = createSelector(
  selectCategoryState,
  (state: CategoryState): boolean => state.categoriesError,
);

export const selectCategoriesLoading = createSelector(
  selectCategoryState,
  (state: CategoryState): boolean => state.categoriesLoading,
);

export const selectCategoriesTotal = createSelector(
  selectCategoryState,
  (state: CategoryState): number => state.categoriesTotal,
);
export const selectCategories = createSelector(
  selectCategoryState,
  categoryReducers.selectAll,
);

export const selectProductState =
  createFeatureSelector<ProductState>('productState');

export const selectProductsIds = createSelector(
  selectProductState,
  _selectProductsDataIds,
);
export const selectCategoryProductsError = createSelector(
  selectProductState,
  (state: ProductState): boolean => state.categoryProductsError,
);

export const selectCategoryProductsLoading = createSelector(
  selectProductState,
  (state: ProductState): boolean => state.categoryProductsLoading,
);

export const selectCategoryProductsTotal = createSelector(
  selectProductState,
  (state: ProductState): number => state.categoryProductsTotal,
);
export const selectProducts = createSelector(
  selectProductState,
  _selectAllProducts,
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

export const selectProductById = (productId: number) =>
  createSelector(
    selectProductState,
    (productState) => productState.entities[productId],
  );
export const selectProductError = createSelector(
  selectProductState,
  (state: ProductState): boolean => state.productError,
);

export const selectProductLoading = createSelector(
  selectProductState,
  (state: ProductState): boolean => state.productLoading,
);
export const selectDisplayType = createSelector(
  selectProductState,
  (state: ProductState): DisplayTypes => state.displayType,
);
