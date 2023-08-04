import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { DisplayTypes, ICategory, IProduct } from 'src/app/interfaces';

export interface CategoryState extends EntityState<ICategory> {
  categoriesLoading: boolean;
  categoriesError: any;
  categoriesTotal: number;
  selectedCategoryId: number | null;
}

export const categoryAdapter: EntityAdapter<ICategory> =
  createEntityAdapter<ICategory>({
    selectId: (category: ICategory) => category.id,
  });

export const initialCategoryState: CategoryState = categoryAdapter.getInitialState({
  categoriesError: null,
  categoriesLoading: true,
  categoriesTotal: 0,
  selectedCategoryId: null,
});

export interface ProductState extends EntityState<IProduct> {
  categoryProductsTotal: number;
  categoryProductsLoading: boolean;
  categoryProductsError: any;
  selectedProductId: number | null;
  productLoading: boolean;
  productError: any;
  displayType: DisplayTypes;
}

export const productAdapter: EntityAdapter<IProduct> =
  createEntityAdapter<IProduct>({
    selectId: (product: IProduct) => product.id,
  });

export const initialProductState: ProductState = productAdapter.getInitialState({
  categoryProductsTotal: 0,
  categoryProductsError: null,
  categoryProductsLoading: true,
  selectedProductId: null,
  productError: null,
  productLoading: true,
  displayType: DisplayTypes.DISPLAY_GRID,
});
export const initialState = {
  categories: initialCategoryState,
};