import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { ICategory } from '../../interfaces';
import { IShopState2 } from './shop.reducers';

export const selectShopState2 = createFeatureSelector<IShopState2>('shopState2');

export const selectCategories2 = () =>
  createSelector(selectShopState2, (state: IShopState2) => state.categories2);
export const selectCategory2 = (id: number) =>
  createSelector(selectShopState2, (state: IShopState2) =>
    state.categories2.find((d) => d.id === id)
  );
export const selectProducts2 = (categoryId: number) =>
  createSelector(selectShopState2, (state: IShopState2) => state.products2);
export const selectProduct2 = (id: number) =>
  createSelector(selectShopState2, (state: IShopState2) => state.product2);

export const selectDisplayType2 = () =>
  createSelector(selectShopState2, (state: IShopState2) => state.displayType2);
