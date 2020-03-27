import {
  CATEGORY_CREATE,
  CATEGORY_GET,
  CATEGORIES_GET,
  CATEGORY_UPDATE,
  CATEGORY_DELETE,
  CATEGORY_ERROR,
  SET_CURRENT,
  CLEAR_CURRENT
} from '../actions/types';

const initialState = {
  categories: [],
  created: false,
  updated: false,
  category: null,
  current: null,
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
        loading: false,
        created: true,
        category: payload
      };
    case SET_CURRENT:
      return {
        ...state,
        current: payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case CATEGORY_UPDATE:
      return {
        ...state,
        updated: true,
        // categories: state.categories.map(category =>
        //   category.id === payload.id ? payload : category
        // ),
        category: payload,
        loading: false
      };
    case CATEGORY_GET:
      return {
        ...state,
        category: payload,
        loading: false
      };
    case CATEGORY_DELETE:
    case CATEGORY_ERROR:
      return {
        ...state,
        loading: true,
        category: null
      };
    default:
      return state;
  }
}
