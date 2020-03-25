import {
  CATEGORY_CREATE,
  CATEGORY_GET,
  CATEGORIES_GET,
  CATEGORY_UPDATE,
  CATEGORY_DELETE,
  CATEGORY_ERROR
} from '../actions/types';

const initialState = {
  categories: [],
  category: null,
  created: false,
  updated: false,
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CATEGORIES_GET:
      return {
        ...state,
        categories: payload,
        loading: false
      };
    case CATEGORY_CREATE:
      return {
        ...state,
        created: true,
        loading: false,
        category: payload
      };
    case CATEGORY_UPDATE:
      return {
        ...state,
        updated: true,
        category: payload,
        loading: false
      };
    case CATEGORY_DELETE:
    case CATEGORY_ERROR:
      return {
        ...state,
        created: false,
        loading: true,
        category: null
      };
    default:
      return state;
  }
}
