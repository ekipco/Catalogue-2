import { ProductItem } from '@modules/shopping/models';
import { createReducer, on } from '@ngrx/store';
import * as actions from './actions';

export const featureKey = 'productDetailsState';

export interface ProductDetailsState {
  initialized: boolean;
  loading: boolean;
  product: ProductItem;
}

export const initialState: ProductDetailsState = {
  initialized: false,
  loading: false,
  product: null!
};

export const reducer = createReducer(
  initialState,
  on(actions.initialize, () => initialState),
  on(actions.initialized, (state) => ({ ...state, initialized: true })),
  on(actions.getProduct, (state) => ({ ...state, loading: true })),
  on(actions.getProductSuccess, (state, { response }) => ({ ...state, loading: false, product: response })),
  on(actions.getProductFail, (state) => ({ ...state, loading: false })),
  on(actions.addToFavoritesSuccess, (state) => {
    return ({ ...state, product: ({ ...state.product, isFavorite: !state.product.isFavorite }) });
  }),
  on(actions.destroy, () => undefined!)
);
