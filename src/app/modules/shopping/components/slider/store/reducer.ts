import { SliderImage } from '@modules/shopping/models';
import { createReducer, on } from '@ngrx/store';
import * as actions from './actions';

export const featureKey = 'sliderState';

export interface SliderState {
  initialized: boolean;
  loading: boolean;
  images: SliderImage[];
}

export const initialState: SliderState = {
  initialized: false,
  loading: false,
  images: []
};

export const reducer = createReducer(
  initialState,
  on(actions.initialize, () => initialState),
  on(actions.initialized, (state) => ({ ...state, initialized: true })),
  on(actions.getImages, (state) => ({ ...state, loading: true })),
  on(actions.getImagesSuccess, (state, { response }) => ({ ...state, loading: false, images: response })),
  on(actions.getImagesFail, (state) => ({ ...state, loading: false })),
  on(actions.destroy, () => undefined!)
);
