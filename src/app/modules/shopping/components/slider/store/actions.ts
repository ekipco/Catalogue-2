import { SliderImage } from '@modules/shopping/models';
import { createAction, props } from '@ngrx/store';

// API
export const getImages = createAction('[SLIDER][API] Get images');
export const getImagesSuccess = createAction('[SLIDER][API] Get images success', props<{ response: SliderImage[] }>());
export const getImagesFail = createAction('[SLIDER][API] Get images fail');

// STATE
export const initialize = createAction('[SLIDER][STATE] Initialize');
export const initialized = createAction('[SLIDER][STATE] Initialized');
export const destroy = createAction('[SLIDER][STATE] Destroy');
