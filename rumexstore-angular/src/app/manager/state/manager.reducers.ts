import { createReducer, on } from '@ngrx/store';
import { ICategory, IProductsWithInfo,ProductsWithInfo, DisplayTypes } from '../../interfaces';

import {
  setProductList,
} from './manager.actions';

export interface IManagerState {
  productsWithInfo: IProductsWithInfo;
}

export const initialState: IManagerState = {
  productsWithInfo: new ProductsWithInfo(),
};

export const shopReducer = createReducer(
  initialState,
  on(setProductList, (state, { productsWithInfo }) => {
    return { ...state, productsWithInfo };
  })
);
