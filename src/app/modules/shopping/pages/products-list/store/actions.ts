import { CategoryItem, ProductItem } from '@modules/shopping/models';
import { createAction, props } from '@ngrx/store';

// API
export const getProducts = createAction('[PRODUCTS LIST][API] Get products');
export const getProductsSuccess = createAction('[PRODUCTS LIST][API] Get products success', props<{ products: Record<number, ProductItem[]> }>());
export const getProductsFail = createAction('[PRODUCTS LIST][API] Get products fail');

export const addToFavorites = createAction('[PRODUCTS LIST][API] Add to favorites', props<{ product: ProductItem }>());
export const addToFavoritesSuccess = createAction('[PRODUCTS LIST][API] Add to favorites success', props<{ product: ProductItem }>());
export const addToFavoritesFail = createAction('[PRODUCTS LIST][API] Add to favorites fail');

// STATE
export const initialize = createAction('[PRODUCTS LIST][STATE] Initialize');
export const initialized = createAction('[PRODUCTS LIST][STATE] Initialized', props<{ categories: Record<number, CategoryItem> }>());
export const setProducts = createAction('[PRODUCTS LIST][STATE] Set products', props<{ products: Record<number, ProductItem[]> }>());
export const destroy = createAction('[PRODUCTS LIST][STATE] Destroy');
