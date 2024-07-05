import { createStore, combineReducers } from 'redux';

const initialProductsState = {
  loading: false,
  loadingSearch: false,
  categories: [],
  viewing: null,
  products: [],
  searched: [],
  selectedCategoryId: 2,
  selectedCategory: {},
};
export const GETTINGPRODUCT = 'GettingProduct';
export const gettingProductAction = () => ({
  type: GETTINGPRODUCT,
});

export const GOTPRODUCT = 'GotProduct';
export const gotProductAction = (product) => ({
  type: GOTPRODUCT,
  viewing: product,
});

export const GETTINGALLCATEGORIES = 'GettingAllCategories';
export const gettingAllCategoriesAction = () => ({
  type: GETTINGALLCATEGORIES,
});

export const GOTALLCATEGORIES = 'GotAllCategories';
export const gotAllCategoriesAction = (categories) => ({
  type: GOTALLCATEGORIES,
  categories: categories,
});

export const GETTINGFEATUREDPRODUCTS = 'GettingFeaturedProducts';
export const gettingFeaturedProductsAction = () => ({
  type: GETTINGFEATUREDPRODUCTS,
});

export const SETSELECTEDCATEGORY = 'SetSelectedCategory';
export const setSelectedCategoryAction = (
  selectedCategoryId,
  selectedCategory,
) => ({
  type: SETSELECTEDCATEGORY,
  selectedCategoryId: selectedCategoryId,
  selectedCategory: selectedCategory,
});

export const GOTFEATUREDPRODUCTS = 'GotFeaturedProducts';
export const gotFeaturedProductsAction = (products) => ({
  type: GOTFEATUREDPRODUCTS,
  products: products,
});

export const SEARCHINGPRODUCTS = 'SearchingProducts';
export const searchingProductsAction = () => ({
  type: SEARCHINGPRODUCTS,
});

export const SEARCHEDRODUCTS = 'SearchedProducts';
export const searchedProductsAction = (products) => ({
  type: SEARCHEDRODUCTS,
  searched: products,
});

export const GETTINGPRODUCTS = 'GettingProducts';
export const gettingProductsAction = () => ({
  type: GETTINGPRODUCTS,
});

export const GOTPRODUCTS = 'GotProducts';
export const gotProductsAction = (products) => ({
  type: GOTPRODUCTS,
  products: products,
});

const productsReducer = (state = initialProductsState, action) => {
  switch (action.type) {
    case GETTINGPRODUCT: {
      return {
        ...state,
        viewing: null,
        loading: true,
      };
    }
    case GOTPRODUCT: {
      return {
        ...state,
        viewing: action.viewing,
        loading: false,
      };
    }
    case GETTINGALLCATEGORIES: {
      return {
        ...state,
        loading: true,
      };
    }
    case GOTALLCATEGORIES: {
      return {
        ...state,
        categories: action.categories,
        loading: false,
      };
    }
    case GETTINGFEATUREDPRODUCTS: {
      return {
        ...state,
        loading: true,
      };
    }
    case SEARCHINGPRODUCTS: {
      return {
        ...state,
        searched: [],
        loadingSearch: true,
      };
    }
    case SEARCHEDRODUCTS: {
      return {
        ...state,
        searched: action.searched,
        loadingSearch: false,
      };
    }
    case SETSELECTEDCATEGORY: {
      return {
        ...state,
        selectedCategoryId: action.selectedCategoryId,
        selectedCategory: action.selectedCategory,
      };
    }
    case GOTFEATUREDPRODUCTS: {
      return {
        ...state,
        products: action.products,
        loading: false,
      };
    }
    case GETTINGPRODUCTS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GOTPRODUCTS: {
      return {
        ...state,
        products: action.products,
        loading: false,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
  //  return state;
};
const rootReducer = combineReducers({
  products: productsReducer,
});

export function configureStore() {
  const store = createStore(rootReducer, undefined);
  return store;
}
