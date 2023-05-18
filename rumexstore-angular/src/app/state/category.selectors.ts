import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { ICategory } from '../interfaces';
import { ICategoryState } from './category.reducers';

export const selectCategoryState =
  createFeatureSelector<ICategoryState>('categoryState');

export const selectCategories = () =>
  createSelector(
    selectCategoryState,
    (state: ICategoryState) => state.categories
  );
export const selectCategory = (id: number) =>
  createSelector(selectCategoryState, (state: ICategoryState) =>
    state.categories.find((d) => d.id === id)
  );
