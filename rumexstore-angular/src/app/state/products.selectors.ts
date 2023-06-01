import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { ICategory } from '../interfaces';
import { IProductsState } from './products.reducers';

export const selectCategoryState =
  createFeatureSelector<IProductsState>('categoryState');

export const selectCategories = () =>
  createSelector(
    selectCategoryState,
    (state: IProductsState) => state.categories
  );
export const selectCategory = (id: number) =>
  createSelector(selectCategoryState, (state: IProductsState) =>
    state.categories.find((d) => d.id === id)
  );
export const selectProducts = (categoryId: number) =>
  createSelector(
    selectCategoryState,
    (state: IProductsState) => state.products
  );
export const selectProduct = (id: number) =>
  createSelector(selectCategoryState, (state: IProductsState) => state.product);

export const selectDisplayType = () =>
  createSelector(
    selectCategoryState,
    (state: IProductsState) => state.displayType
  );
