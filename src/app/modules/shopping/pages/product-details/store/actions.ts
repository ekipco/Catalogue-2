import { ProductItem } from '@modules/shopping/models';
import { createAction, props } from '@ngrx/store';

// API
export const getProduct = createAction('[PRODUCT DETAILS][API] Get product', props<{ productId: number }>());
export const getProductSuccess = createAction('[PRODUCT DETAILS][API] Get product success', props<{ response: ProductItem }>());
export const getProductFail = createAction('[PRODUCT DETAILS][API] Get product fail');

export const addToFavorites = createAction('[PRODUCT DETAILS][API] Add to favorites', props<{ product: ProductItem }>());
export const addToFavoritesSuccess = createAction('[PRODUCT DETAILS][API] Add to favorites success');
export const addToFavoritesFail = createAction('[PRODUCT DETAILS][API] Add to favorites fail');


// STATE
export const initialize = createAction('[PRODUCT DETAILS][STATE] Initialize');
export const initialized = createAction('[PRODUCT DETAILS][STATE] Initialized', props<{ productId: number }>());
export const destroy = createAction('[PRODUCT DETAILS][STATE] Destroy');
