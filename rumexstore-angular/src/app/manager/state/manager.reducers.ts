import { createReducer, on } from '@ngrx/store';

import { managerAdapter, initialManagerState } from './manager.state';
import * as managerActions from '../state/manager.actions';
import { Action } from '@ngrx/store';
import { state } from '@angular/animations';
export const managerReducer = createReducer(
  initialManagerState,
  on(managerActions.loadingAllProducts, (state) => ({
    ...state,
    productsLoading: true,
  })),
  on(managerActions.loadAllProductsSuccess, (state, { response }) =>
    managerAdapter.setAll(response.products, {
      ...state,
      productsError: null,
      productsLoading: false,
      productsTotal: response.total,
    })
  ),
  on(managerActions.loadAllProductsFailure, (state) =>
    managerAdapter.removeAll({
      ...state,
      productsError: true,
      productsLoading: false,
      productsTotal: 0,
    })
  )
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  managerAdapter.getSelectors();
