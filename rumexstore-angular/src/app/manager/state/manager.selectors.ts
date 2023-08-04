import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as managerReducers from './manager.reducers';
import { ManagerState, managerAdapter } from './manager.state';

export const {
  selectIds: _selectProductDataIds,
  selectEntities: _selectProductEntities,
  selectAll: _selectAllProduct,
  selectTotal: _selectProductTotal,
} = managerAdapter.getSelectors();

export const selectManagerState =
  createFeatureSelector<ManagerState>('managerState');

export const selectProductIds = createSelector(
  selectManagerState,
  _selectProductDataIds
);

export const selectProductEntities = createSelector(
  selectManagerState,
  _selectProductEntities
);

export const selectAllProduct = createSelector(
  selectManagerState,
  _selectAllProduct
);

export const selectProducts = createSelector(
  selectManagerState,
  managerReducers.selectAll
);
export const selectProductsTotal = createSelector(
  selectManagerState,
  (state: ManagerState): number => state.productsTotal
);
export const selectProductsLoading = createSelector(
  selectManagerState,
  (state: ManagerState): boolean => state.productsLoading
);
export const selectProductsError = createSelector(
  selectManagerState,
  (state: ManagerState): any => state.productsError
);
