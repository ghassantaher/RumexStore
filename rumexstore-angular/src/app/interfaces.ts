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
export enum DisplayTypes {
  DISPLAY_GRID = 'grid',
  DISPLAY_LIST = 'list',
}
