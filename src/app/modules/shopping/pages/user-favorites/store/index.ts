import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './reducer';

const featureSelector = createFeatureSelector<fromReducer.UserFavoritesState>(fromReducer.featureKey);

const loading = createSelector(featureSelector, (state) => state.loading);
const favorites = createSelector(featureSelector, (state) => state.favorites);

export const userFavoritesSelectors = {
  loading,
  favorites
}
