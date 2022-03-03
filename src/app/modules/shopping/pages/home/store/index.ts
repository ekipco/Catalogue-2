import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './reducer';

const featureSelector = createFeatureSelector<fromReducer.HomeState>(fromReducer.featureKey);

const loading = createSelector(featureSelector, (state) => state.loading);
const categories = createSelector(featureSelector, (state) => state.categories);

export const homeSelectors = {
  loading,
  categories
}
