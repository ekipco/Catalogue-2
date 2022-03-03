import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './reducer';

const featureSelector = createFeatureSelector<fromReducer.ProductDetailsState>(fromReducer.featureKey);

const loading = createSelector(featureSelector, (state) => state.loading);
const product = createSelector(featureSelector, (state) => state.product);

export const productDetailsSelectors = {
  loading,
  product
}
