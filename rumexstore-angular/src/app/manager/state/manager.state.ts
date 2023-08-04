import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IProduct } from 'src/app/interfaces';

export interface ManagerState extends EntityState<IProduct> {
  productsLoading: boolean;
  productsError: any;
  productsTotal: number;
  selectedProductId: number | null;
}

export const managerAdapter: EntityAdapter<IProduct> = createEntityAdapter<IProduct>({
  selectId: (product: IProduct) => product.id,
});

export const initialManagerState: ManagerState = managerAdapter.getInitialState({
  productsError: null,
  productsLoading: false,
  productsTotal: 0,
  selectedProductId: null,
});
