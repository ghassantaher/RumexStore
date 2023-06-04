import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { ICategory } from '../../interfaces';
import { IManagerState } from './manager.reducers';
import { PageEvent } from '@angular/material/paginator';

export const selectManagerState =
  createFeatureSelector<IManagerState>('managerState');
export const selectProducts = () =>
  createSelector(selectManagerState, (state: IManagerState) => state.productsWithInfo);
