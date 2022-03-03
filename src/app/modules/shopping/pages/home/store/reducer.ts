import { CategoryItem } from '@modules/shopping/models';
import { createReducer, on } from '@ngrx/store';
import * as actions from './actions';

export const featureKey = 'homeState';

export interface HomeState {
  initialized: boolean;
  loading: boolean;
  categories: CategoryItem[]
}

export const initialState: HomeState = {
  initialized: false,
  loading: false,
  categories: []
};

export const reducer = createReducer(
  initialState,
  on(actions.initialize, () => initialState),
  on(actions.initialized, (state) => ({ ...state, initialized: true })),
  on(actions.getCategories, (state) => ({ ...state, loading: true })),
  on(actions.getCategoriesSuccess, (state, { response }) => ({ ...state, loading: false, categories: response })),
  on(actions.getCategoriesFail, (state) => ({ ...state, loading: false })),
  on(actions.destroy, () => undefined!)
);
