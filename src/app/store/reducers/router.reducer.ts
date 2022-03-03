import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Data, Params, Router, RouterStateSnapshot } from '@angular/router';
import { EKIPCO_NAV, LayoutModule, NavigationItem } from '@ekipco/layout';
import { routerReducer, RouterReducerState, RouterStateSerializer } from '@ngrx/router-store';

export const featureKey = 'router';

export interface RouterState {
  url: string;
  queryParams: Params;
  params: Params;
  data: Data;
  currentNavigation: NavigationItem[];
  currentNavigationKey: string;
}

export const initialState: RouterReducerState<RouterState> = {
  state: {
    url: '/',
    params: {},
    queryParams: {},
    data: {},
    currentNavigation: [],
    currentNavigationKey: ''
  },
  navigationId: 0,
};

export const reducer = routerReducer;

@Injectable()
export class RavenRouterStateSerializer implements RouterStateSerializer<RouterState> {

  constructor(private _router: Router, @Inject(EKIPCO_NAV) private _navigation: Record<string, NavigationItem[]>) { }

  serialize(routerState: RouterStateSnapshot): RouterState {
    const nav = this._router.getCurrentNavigation();
    const path = routerState.root.firstChild?.routeConfig?.path ?? '';
    const currentNavigationKey = LayoutModule.getCurrentNavigation(path);
    return {
      url: routerState.url,
      params: mergeRouteParams(routerState.root, r => r.params),
      queryParams: mergeRouteParams(routerState.root, r => r.queryParams),
      data: mergeRouteData(routerState.root, nav?.extras.state ?? {}),
      currentNavigation: Boolean(currentNavigationKey) ? this._navigation[currentNavigationKey] : [],
      currentNavigationKey
    };
  }
}

function mergeRouteParams(route: ActivatedRouteSnapshot | null, getter: (r: ActivatedRouteSnapshot) => Params): Params {
  if (!route) return {};
  const currentParams = getter(route);
  const primaryChild = route.children.find(c => c.outlet === 'primary') || route.firstChild;
  return { ...currentParams, ...mergeRouteParams(primaryChild, getter) };
}

function mergeRouteData(route: ActivatedRouteSnapshot | null, state?: any): Data {
  if (!route) return {};
  const currentData = { ...route.data, ...state };
  const primaryChild = route.children.find(c => c.outlet === 'primary') || route.firstChild;
  return { ...currentData, ...mergeRouteData(primaryChild) };
}

export const navigation = (state: RouterReducerState<RouterState>) => state.state.currentNavigation ?? [];
export const routeData = (state: RouterReducerState<RouterState>) => state.state.data;
export const routeParams = (state: RouterReducerState<RouterState>) => state.state.params;
export const routeQueryParams = (state: RouterReducerState<RouterState>) => state.state.queryParams;
export const routeUrl = (state: RouterReducerState<RouterState>) => state.state.url;
