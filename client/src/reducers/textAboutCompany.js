import {
  CREATE_COMPANY_TEXT,
  UPDATE_COMPANY_TEXT,
  DELETE_COMPANY_TEXT,
  ERROR_COMPANY_TEXT,
  GET_COMPANY_TEXT,
  GET_COMPANY_TEXTS
} from '../actions/types';

const intialState = {
  texts: [],
  text: null,
  created: false,
  get: false,
  loading: false
};

export default function(state = intialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_COMPANY_TEXT:
      return {
        ...state,
        text: payload,
        loading: false
      };
    case GET_COMPANY_TEXT:
      return {
        ...state,
        text: payload,
        get: true
      };
    case GET_COMPANY_TEXTS:
      return {
        ...state,
        texts: payload,
        loading: false
      };
    case ERROR_COMPANY_TEXT:
    case DELETE_COMPANY_TEXT:
      return {
        ...state,
        text: null,
        loading: false
      };
    default:
      return state;
  }
}
