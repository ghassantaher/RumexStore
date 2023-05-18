import { createReducer, on } from '@ngrx/store';
import { ICategory } from '../interfaces';

import { setCategoryList } from './category.actions';

export interface ICategoryState {
  categories: ReadonlyArray<ICategory>;
}

export const initialState: ICategoryState = {
  categories: [],
};

export const categoryReducer = createReducer(
  initialState,
  on(setCategoryList, (state, { categories }) => {
    return { ...state, categories };
  })
);
