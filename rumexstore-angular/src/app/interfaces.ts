import { MatSort } from '@angular/material/sort';

export interface ICategory {
  id: number;
  categoryName: string;
  products: string[];
}

export interface IProduct {
  id: number;
  name: string;
  categoryName: string;
  description: string;
  price: number;
  imageUrl: string;
}

export enum DisplayTypes {
  DISPLAY_GRID = 'grid',
  DISPLAY_LIST = 'list',
}
export interface IHttpParams {
  filterColumn: string;
  filterQuery: string;
  sortDirection: 'asc' | 'desc' | '';
  sortField: string;
  pageIndex: number;
  pageSize: number;
}

export interface IAllProductsResponse {
  total: number;
  products: IProduct[];
}
export interface ICategoriesResponse {
  total: number;
  categories: ICategory[];
}
export interface ICategoryProductsResponse {
  total: number;
  products: IProduct[];
}
