import { ProductItem } from '@modules/shopping/models';
import { createReducer, on } from '@ngrx/store';
import * as actions from './actions';

export const featureKey = 'userFavoritesState';

export interface UserFavoritesState {
  initialized: boolean;
  loading: boolean;
  favorites: ProductItem[]
}

export const initialState: UserFavoritesState = {
  initialized: false,
  loading: false,
  favorites: []
};

export const reducer = createReducer(
  initialState,
  on(actions.initialize, () => initialState),
  on(actions.initialized, (state) => ({ ...state, initialized: true })),
  on(actions.getFavorites, (state) => ({ ...state, loading: true })),
  on(actions.getFavoritesSuccess, (state, { response }) => ({ ...state, loading: false, favorites: response })),
  on(actions.getFavoritesFail, (state) => ({ ...state, loading: false })),
  on(actions.addToFavoritesSuccess, (state, { product }) => {
    const removed = state.favorites.filter((m) => m.id !== product.id);
    return ({ ...state, favorites: [...removed] });
  }),
  on(actions.destroy, () => undefined!)
);
