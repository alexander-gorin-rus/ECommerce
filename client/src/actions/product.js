import axios from 'axios';
import { setAlert } from '../actions/alert';
import {
  PRODUCT_CREATE,
  PRODUCT_UPDATE,
  PRODUCT_DELETE,
  PRODUCT_GET,
  PRODUCTS_GET,
  PRODUCT_ERROR
} from './types';

export const addProduct = product => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = product;

  try {
    const res = axios.post('/api/create-product', config, body);

    dispatch({
      type: PRODUCT_CREATE,
      payload: res.data
    });
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
