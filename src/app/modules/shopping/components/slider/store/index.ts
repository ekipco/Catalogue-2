import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './reducer';

const featureSelector = createFeatureSelector<fromReducer.SliderState>(fromReducer.featureKey);

const loading = createSelector(featureSelector, (state) => state.loading);
const images = createSelector(featureSelector, (state) => state.images);

export const sliderSelectors = {
  loading,
  images
}
