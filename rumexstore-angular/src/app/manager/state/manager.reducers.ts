import { createReducer, on } from '@ngrx/store';

import { managerAdapter, initialManagerState } from './manager.state';
import * as managerActions from '../state/manager.actions';
import { Action } from '@ngrx/store';
import { state } from '@angular/animations';
export const managerReducer = createReducer(
  initialManagerState,
  on(managerActions.loadingProducts, (state) => ({ ...state, loading: true })),
  on(managerActions.loadProductsSuccess, (state, { response }) =>
    managerAdapter.setAll(response.products, {
      ...state,
      error: null,
      loading: false,
      total: response.total,
    })
  ),
  on(managerActions.loadProductsFailure, (state) =>
    managerAdapter.removeAll({
      ...state,
      error: true,
      loading: false,
      total: 0,
    })
  )
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  managerAdapter.getSelectors();
