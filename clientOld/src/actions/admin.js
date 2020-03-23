import axios from 'axios';
import setAdminToken from '../utils/setAdminToken';
import { setAlert } from './alert';
import {
  REG_ADMIN,
  ADMIN_FAIL,
  GET_ADMIN,
  ADMIN_ERROR,
  AUTH_ADMIN,
  LOGIN_FAIL,
  ADMIN_LOGOUT
} from './types';

//Load admin
export const loadAdmin = () => async dispatch => {
  if (localStorage.admin_token) {
    setAdminToken(localStorage.admin_token);
  }

  try {
    const res = await axios.get('/api/get-admin');

    dispatch({
      type: GET_ADMIN,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ADMIN_ERROR
    });
  }
};

//Register admin
export const regAdmin = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/max-register', body, config);

    dispatch({
      type: REG_ADMIN,
      payload: res.data
    });
    dispatch(loadAdmin());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: ADMIN_FAIL
    });
  }
};

//Login Admin
export const loginAdmin = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/max-auth', body, config);

    dispatch({
      type: AUTH_ADMIN,
      payload: res.data
    });
    dispatch(loadAdmin());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const logoutAdmin = () => dispatch => {
  dispatch({ type: ADMIN_LOGOUT });
};
