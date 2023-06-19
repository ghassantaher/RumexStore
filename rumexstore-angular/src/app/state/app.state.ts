import { ManagerState } from '../manager/state/manager.state';
import { IShopState } from '../shop/state/shop.reducers';

export interface AppState {
  shopState: IShopState;
  products: ManagerState;
}

export interface AppState {}
