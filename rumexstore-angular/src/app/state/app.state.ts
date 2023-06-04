import { IManagerState } from '../manager/state/manager.reducers';
import { IShopState } from '../shop/state/shop.reducers';

export interface AppState {
  shopState: IShopState;
  managerState: IManagerState
}
