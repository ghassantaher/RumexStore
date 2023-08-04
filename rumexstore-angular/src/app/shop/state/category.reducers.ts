import { createReducer, on } from '@ngrx/store';
import { ICategory, IProduct, DisplayTypes } from '../../interfaces';
import { initialCategoryState, categoryAdapter } from './shop.state';
import * as shopActions from './shop.actions';

export const categoryReducer = createReducer(
  initialCategoryState,
  on(shopActions.loadingCategories, (state) => ({
    ...state,
    categoriesLoading: true,
  })),
  on(shopActions.loadCategoriesSuccess, (state, { response }) =>
    categoryAdapter.setAll(response.categories, {
      ...state,
      categoriesError: null,
      categoriesLoading: false,
      categoriesTotal: response.total,
    })
  ),
  on(shopActions.loadCategoriesFailure, (state) =>
    categoryAdapter.removeAll({
      ...state,
      categoriesError: true,
      categoriesLoading: false,
      categoriesTotal: 0,
    })
  )
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  categoryAdapter.getSelectors();
