// import { createActionGroup, emptyProps, props } from '@ngrx/store';

// export const CategoryActions = createActionGroup({
//   source: 'Category',
//   events: {
//     'Load Categorys': emptyProps(),
//     'Load Categorys Success': props<{ data: unknown }>(),
//     'Load Categorys Failure': props<{ error: unknown }>(),
//   }
// });
import { createAction, props } from '@ngrx/store';
import { ICategory } from '../interfaces';

export enum CategoryActions {
  GET_CATEGORY_LIST = '[Category] Get Category list',
  SET_CATEGORY_LIST = '[Category] Set Category list',
}

export const getCategoryList = createAction(CategoryActions.GET_CATEGORY_LIST);

export const setCategoryList = createAction(
  CategoryActions.SET_CATEGORY_LIST,
  props<{ categories: ReadonlyArray<ICategory> }>()
);