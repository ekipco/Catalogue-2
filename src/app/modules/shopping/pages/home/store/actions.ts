import { CategoryItem } from '@modules/shopping/models';
import { createAction, props } from '@ngrx/store';

// API
export const getCategories = createAction('[HOME][API] Get categories');
export const getCategoriesSuccess = createAction('[HOME][API] Get categories success', props<{ response: CategoryItem[] }>());
export const getCategoriesFail = createAction('[HOME][API] Get categories fail');

// STATE
export const initialize = createAction('[HOME][STATE] Initialize');
export const initialized = createAction('[HOME][STATE] Initialized');
export const destroy = createAction('[HOME][STATE] Destroy');
