import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { ICategory } from '../../interfaces';
import { IManagerState } from './manager.reducers';

export const selectManagerState =
  createFeatureSelector<IManagerState>('managerState');
export const selectProducts = (categoryId: number) =>
  createSelector(selectManagerState, (state: IManagerState) => state.products);
