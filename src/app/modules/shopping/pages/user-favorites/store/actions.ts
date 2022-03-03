import { ProductItem } from '@modules/shopping/models';
import { createAction, props } from '@ngrx/store';

// API
export const getFavorites = createAction('[USER FAVORITES][API] Get favorites');
export const getFavoritesSuccess = createAction('[USER FAVORITES][API] Get favorites success', props<{ response: ProductItem[] }>());
export const getFavoritesFail = createAction('[USER FAVORITES][API] Get favorites fail');

export const addToFavorites = createAction('[USER FAVORITES][API] Add to favorites', props<{ product: ProductItem }>());
export const addToFavoritesSuccess = createAction('[USER FAVORITES][API] Add to favorites success', props<{ product: ProductItem }>());
export const addToFavoritesFail = createAction('[USER FAVORITES][API] Add to favorites fail');

// STATE
export const initialize = createAction('[USER FAVORITES][STATE] Initialize');
export const initialized = createAction('[USER FAVORITES][STATE] Initialized');
export const destroy = createAction('[USER FAVORITES][STATE] Destroy');
