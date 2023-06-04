import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { ICategory } from '../../interfaces';
import { IShopState } from './shop.reducers';

export const selectShopState =
  createFeatureSelector<IShopState>('shopState');

export const selectCategories = () =>
  createSelector(selectShopState, (state: IShopState) => state.categories);
export const selectCategory = (id: number) =>
  createSelector(selectShopState, (state: IShopState) =>
    state.categories.find((d) => d.id === id)
  );
export const selectProducts = (categoryId: number) =>
  createSelector(selectShopState, (state: IShopState) => state.products);
export const selectProduct = (id: number) =>
  createSelector(selectShopState, (state: IShopState) => state.product);

export const selectDisplayType = () =>
  createSelector(selectShopState, (state: IShopState) => state.displayType);
