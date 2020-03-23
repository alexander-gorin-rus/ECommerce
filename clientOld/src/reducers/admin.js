import {
  GET_ADMIN,
  REG_ADMIN,
  AUTH_ADMIN,
  ADMIN_FAIL,
  ADMIN_ERROR,
  LOGIN_FAIL,
  ADMIN_LOGOUT
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('admin_token'),
  isAuthenticated: false,
  loading: true,
  admin: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ADMIN:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        admin: payload
      };

    case REG_ADMIN:
    case AUTH_ADMIN:
      localStorage.setItem('admin_token', payload.admin_token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };

    case ADMIN_FAIL:
    case ADMIN_ERROR:
    case LOGIN_FAIL:
    case ADMIN_LOGOUT:
      localStorage.removeItem('admin_token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        admin: null
      };
    default:
      return state;
  }
}
