import {
  GET_CONSUMER,
  REG_CONSUMER,
  AUTH_CONSUMER,
  LOADED_CONSUMER,
  ERROR_CONSUMER,
  FAIL_CONSUMER,
  LOGOUT_CONSUMER
} from '../actions/types';

const initialState = {
  consumer_token: localStorage.getItem('consumer_token'),
  consumerAuthenticated: null,
  consumerLoading: true,
  consumer: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CONSUMER: {
      return {
        ...state,
        consumerAuthenticated: true,
        consumerLoading: false,
        consumer: payload
      };
    }
    case REG_CONSUMER:
    case AUTH_CONSUMER:
      localStorage.setItem('consumer_token', payload.consumer_token);
      return {
        ...state,
        ...payload,
        consumerAuthenticated: true,
        consumerLoading: false
      };

    case ERROR_CONSUMER:
    case FAIL_CONSUMER:
    case LOGOUT_CONSUMER:
      localStorage.removeItem('consumer_token');
      return {
        ...state,
        consumer_token: null,
        consumerAuthenticated: false,
        consumerLoading: false
      };
    default:
      return state;
  }
}
