import {
  CATEGORY_CREATE,
  CATEGORY_GET,
  CATEGORIES_GET,
  CATEGORY_UPDATE,
  CATEGORY_DELETE,
  CATEGORY_ERROR
} from '../actions/types';

const initialState = {
  created: false,
  loading: true,
  category: null,
  categories: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CATEGORY_CREATE:
      return {
        ...state,
        created: true,
        loading: false,
        category: payload
      };

    case CATEGORIES_GET:
      return {
        ...state,
        loading: false,
        categories: payload
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
