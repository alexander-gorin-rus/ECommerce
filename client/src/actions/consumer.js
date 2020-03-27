import axios from 'axios';
import setConsumerToken from '../utils/setConsumerToken';
import { setAlert } from './alert';

import {
  GET_CONSUMER,
  REG_CONSUMER,
  AUTH_CONSUMER,
  LOADED_CONSUMER,
  ERROR_CONSUMER,
  FAIL_CONSUMER,
  LOGOUT_CONSUMER
} from '../actions/types';

export const loadConsumer = () => async dispatch => {
  if (localStorage.consumer_token) {
    setConsumerToken(localStorage.consumer_token);
  }

  try {
    const res = await axios.get('/api/get-consumer');
    dispatch({
      type: GET_CONSUMER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ERROR_CONSUMER
    });
  }
};

export const regConsumer = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/register-consumer', body, config);

    dispatch({
      type: REG_CONSUMER,
      payload: res.data
    });
    dispatch(loadConsumer());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: FAIL_CONSUMER
    });
  }
};

export const loginConsumer = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth-consumer', body, config);

    dispatch({
      type: AUTH_CONSUMER,
      payload: res.data
    });
    dispatch(loadConsumer());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: FAIL_CONSUMER
    });
  }
};

export const logoutConsumer = () => dispatch => {
  dispatch({ type: LOGOUT_CONSUMER });
};
