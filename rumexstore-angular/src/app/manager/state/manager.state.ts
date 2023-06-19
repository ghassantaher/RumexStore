import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IProduct } from 'src/app/interfaces';

export interface ManagerState extends EntityState<IProduct> {
  loading: boolean;
  error: any;
  total: number;
  selectedProductId: number | null;
}

export const managerAdapter: EntityAdapter<IProduct> = createEntityAdapter<IProduct>({
  selectId: (product: IProduct) => product.id,
});

export const initialManagerState: ManagerState = managerAdapter.getInitialState({
  error: null,
  loading: true,
  total: 0,
  selectedProductId: null,
});
