import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRouter from './router.reducer';

export const featureKey = 'appState';

export interface AppState {
  [fromRouter.featureKey]: RouterReducerState<fromRouter.RouterState>;
}

export const appReducers = {
  [fromRouter.featureKey]: fromRouter.reducer
}

export const appInitialState = {
  [fromRouter.featureKey]: fromRouter.initialState
}

const getRouterState = createFeatureSelector<RouterReducerState<fromRouter.RouterState>>(fromRouter.featureKey);

const selectData = createSelector(getRouterState, fromRouter.routeData);
const selectParams = createSelector(getRouterState, fromRouter.routeParams);
const selectQueryParams = createSelector(getRouterState, fromRouter.routeQueryParams);
const selectUrl = createSelector(getRouterState, fromRouter.routeUrl);
const selectNavigation = createSelector(getRouterState, fromRouter.navigation);

export const routerSelectors = {
  selectData,
  selectParams,
  selectQueryParams,
  selectUrl,
  selectNavigation
};