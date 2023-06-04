export interface ICategory {
    id:number
    categoryName:string
    products:string[]
}

export interface IProduct {
  id: number;
  name: string;
  categoryName:string;
  description: string;
  price:number;
  imageUrl:string;
}
export interface IProductsWithInfo {
  products: IProduct[];
  length: number;
  pageIndex: number;
  pageSize: number;
}
export class ProductsWithInfo implements IProductsWithInfo {
  products: IProduct[] = [];
  length: number=0;
  pageIndex: number=0;
  pageSize: number=0;
}

export enum DisplayTypes {
  DISPLAY_GRID = 'grid',
  DISPLAY_LIST = 'list',
}
