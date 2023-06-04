import { createReducer, on } from '@ngrx/store';
import { ICategory, IProduct, DisplayTypes } from '../../interfaces';

import {
  setProductList,
} from './manager.actions';

export interface IManagerState {
  products: Array<IProduct>;
}

export const initialState: IManagerState = {
  products: [],
};

export const shopReducer = createReducer(
  initialState,
  on(setProductList, (state, { products }) => {
    return { ...state, products };
  })
);
