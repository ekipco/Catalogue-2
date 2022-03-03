import { CategoryItem, ProductItem } from '@modules/shopping/models';
import { createReducer, on } from '@ngrx/store';
import * as actions from './actions';

export const featureKey = 'productListState';

export interface ProductListState {
  initialized: boolean;
  loading: boolean;
  categories: Record<number, CategoryItem>,
  products: Record<number, ProductItem[]>
}

export const initialState: ProductListState = {
  initialized: false,
  loading: false,
  categories: [],
  products: {}
};

export const reducer = createReducer(
  initialState,
  on(actions.initialize, () => initialState),
  on(actions.initialized, (state, { categories }) => ({ ...state, categories, initialized: true })),
  on(actions.setProducts, (state, { products }) => ({ ...state, products, initialized: true })),
  on(actions.addToFavoritesSuccess, (state, { product }) => {

    const products = state.products[product.category];
    const reduced = products.reduce((prev, curr) => ({ ...prev, [curr.id]: curr }), {});
    const mapped = ({ ...reduced, [product.id]: ({ ...product, isFavorite: !product.isFavorite }) });
    const converted = Object.values(mapped) as ProductItem[];

    return ({ ...state, products: ({ ...state.products, [product.category]: converted }) });
  }),
  on(actions.destroy, () => undefined!)
);
