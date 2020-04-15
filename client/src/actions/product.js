import axios from 'axios';
import { setAlert } from '../actions/alert';
import setAdminToken from '../utils/setAdminToken';
import {
  PRODUCT_CREATE,
  PRODUCT_UPDATE,
  PRODUCT_DELETE,
  PRODUCT_GET,
  PRODUCTS_GET,
  PRODUCT_ERROR,
  GET_ADMIN,
  ADMIN_ERROR
} from './types';

const loadAdmin = () => async dispatch => {
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
      ADMIN_ERROR
    });
  }
};

export const addProduct = product => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };

  const body = product;

  try {
    const res = axios.post('/api/create-product', config, body);

    dispatch({
      type: PRODUCT_CREATE,
      payload: res.data
    });
    dispatch(loadAdmin());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PRODUCT_ERROR
    });
  }
};

export const getProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/products/getProducts');
    dispatch({
      type: PRODUCTS_GET,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR
    });
  }
};
