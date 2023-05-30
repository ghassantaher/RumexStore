import { createReducer, on } from '@ngrx/store';
import { ICategory, IProduct, DisplayTypes } from '../interfaces';

import {
  setCategoryList,
  setDisplayType,
  setProductList,
  setProduct,
} from './products.actions';

export interface IProductsState {
  categories: ReadonlyArray<ICategory>;
  products: ReadonlyArray<IProduct>;
  product: IProduct | undefined;
  displayType: DisplayTypes;
}

export const initialState: IProductsState = {
  categories: [],
  products: [],
  product: undefined,
  displayType: DisplayTypes.DISPLAY_GRID,
};

export const categoryReducer = createReducer(
  initialState,
  on(setCategoryList, (state, { categories }) => {
    return { ...state, categories };
  }),
  on(setProductList, (state, { products }) => {
    return { ...state, products };
  }),
  on(setProduct, (state, { product }) => {
    return { ...state, product };
  }),
  on(setDisplayType, (state, { displayType }) => {
    return {
      ...state,
      displayType,
    };
  })
);
