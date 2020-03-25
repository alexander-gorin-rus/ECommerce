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
    dispatch(setAlert('Категория успешно создана', 'success'));
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
    const res = await axios.get('/api/categories');
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

export const deleteCategory = id => async dispatch => {
  try {
    await axios.delete(`api/delete-category/${id}`);
    dispatch({
      type: CATEGORY_DELETE,
      payload: id
    });
    dispatch(setAlert('Категория товаров успешно удалена', 'success'));
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR
    });
  }
};

export const updateCategory = id => name => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.put(`/api/update-category/${id}`, config);
    dispatch({
      type: CATEGORY_UPDATE,
      payload: res.data
    });
    dispatch(
      setAlert(`В катерогию ${name} успешно внесены изменения`, 'success')
    );
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR
    });
    dispatch(
      setAlert(`В категорию ${name} внести изменения не удалось`, 'danger')
    );
  }
};
