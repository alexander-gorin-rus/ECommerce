import {
  CREATE_COMPANY_NAME,
  UPDATE_COMPANY_NAME,
  DELETE_COMPANY_NAME,
  ERROR_COMPANY_NAME,
  GET_COMPANY_NAME,
  GET_COMPANY_NAMES
} from '../actions/types';

const initialState = {
  names: [],
  name: null,
  created: false,
  updated: false,
  current: null,
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_COMPANY_NAMES:
      return {
        ...state,
        names: payload,
        loading: false
      };
    case CREATE_COMPANY_NAME:
      return {
        ...state,
        loading: false,
        created: true,
        category: payload
      };
    case GET_COMPANY_NAME:
      return {
        ...state,
        name: payload,
        loading: false
      };
    case DELETE_COMPANY_NAME:
    case ERROR_COMPANY_NAME:
      return {
        ...state,
        loading: true,
        category: null
      };
    default:
      return state;
  }
}
