import {
  PRODUCT_CREATE,
  PRODUCT_UPDATE,
  PRODUCT_DELETE,
  PRODUCT_GET,
  PRODUCTS_GET,
  PRODUCT_ERROR
} from '../actions/types';

const initialState = {
  products: [],
  product: null,
  created: false,
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_CREATE:
      return {
        ...state,
        created: true,
        loading: false,
        product: payload
      };
    case PRODUCTS_GET:
      return {
        ...state,
        products: payload,
        loading: false
      };
    case PRODUCT_ERROR:
    case PRODUCT_DELETE:
      return {
        ...state,
        created: false,
        loading: true,
        product: null,
        products: []
      };
    default:
      return state;
  }
}
