import axios from 'axios';
import setAdminToken from '../utils/setAdminToken';
import { setAlert } from './alert';
import {
  CATEGORY_CREATE,
  CATEGORY_GET,
  CATEGORIES_GET,
  CATEGORY_UPDATE,
  CATEGORY_DELETE,
  CATEGORY_ERROR,
  GET_ADMIN,
  ADMIN_ERROR
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

export const createCateg = ({ name }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name });

  try {
    const res = await axios.post('/api/create-category', body, config);

    dispatch({
      type: CATEGORY_CREATE,
      payload: res.data
    });
    // dispatch(loadAdmin());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: CATEGORY_ERROR
    });
  }
};

export const getCategories = () => async dispatch => {
  try {
    const res = axios.get('/api/categories');
    dispatch({
      type: CATEGORIES_GET,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: CATEGORY_ERROR
    });
  }
};
