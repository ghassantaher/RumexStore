import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromAttendee from './manager.reducers';
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

export const selectProductError = createSelector(
  selectManagerState,
  (state: ManagerState): boolean => state.error
);

export const selectProductLoading = createSelector(
  selectManagerState,
  (state: ManagerState): boolean => state.loading
);


export const selectProductTotal = createSelector(
  selectManagerState,
  (state: ManagerState): number => state.total
);
export const selectProducts = createSelector(
  selectManagerState,
  fromAttendee.selectAll
);
export const selectProductsTotal = createSelector(
  selectManagerState,
  (state: ManagerState): number => state.total
);
export const selectProductsLoading = createSelector(
  selectManagerState,
  (state: ManagerState): boolean => state.loading
);
export const selectProductsError = createSelector(
  selectManagerState,
  (state: ManagerState): any => state.error
);
