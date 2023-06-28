import { createReducer, on } from '@ngrx/store';
import { ICategory, IProduct, DisplayTypes } from '../../interfaces';

import {
  setCategoryList2,
  setDisplayType2,
  setProductList2,
  setProduct2,
} from './shop.actions';

export interface IShopState2 {
  categories2: ReadonlyArray<ICategory>;
  products2: Array<IProduct>;
  product2: IProduct | undefined;
  displayType2: DisplayTypes;
}

export const initialState2: IShopState2 = {
  categories2: [],
  products2: [],
  product2: undefined,
  displayType2: DisplayTypes.DISPLAY_GRID,
};

export const shopReducer2 = createReducer(
  initialState2,
  on(setCategoryList2, (state, { categories2 }) => {
    return { ...state, categories2 };
  }),
  on(setProductList2, (state, { products2 }) => {
    return { ...state, products2 };
  }),
  on(setProduct2, (state, { product2 }) => {
    return { ...state, product2 };
  }),
  on(setDisplayType2, (state, { displayType2 }) => {
    return {
      ...state,
      displayType2,
    };
  })
);
