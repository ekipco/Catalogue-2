import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './reducer';

const featureSelector = createFeatureSelector<fromReducer.ProductListState>(fromReducer.featureKey);

const loading = createSelector(featureSelector, (state) => state.loading);
const initialized = createSelector(featureSelector, (state) => state.initialized);
const categories = createSelector(featureSelector, (state) => state.categories);
const category = (categoryId: number) => createSelector(featureSelector, (state) => state.categories[categoryId]);
const products = createSelector(featureSelector, (state) => state.products);

export const productListSelectors = {
  loading,
  initialized,
  categories,
  products,
  category
}
