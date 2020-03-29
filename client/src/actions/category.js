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
  SET_CURRENT,
  SET_LOADING,
  CLEAR_CURRENT,
  GET_ADMIN,
  ADMIN_ERROR
} from './types';

export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};

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

export const getCategory = id => async dispatch => {
  try {
    const res = await axios.get(`/get-category/${id}`);
    dispatch({
      type: CATEGORY_GET,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR
    });
  }
};

//create or update category
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

export const setCurrent = category => {
  return {
    type: SET_CURRENT,
    payload: category
  };
};

export const clearCurrent = category => {
  return {
    type: CLEAR_CURRENT,
    payload: category
  };
};

export const updateCategory = category => id => async dispatch => {
  try {
    setLoading();
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    //const { name } = req.body

    const res = await axios.put(`/api/update-category/${id}`);

    dispatch({
      type: CATEGORY_UPDATE
      //payload: data
    });
    dispatch(setAlert('Название катерогии успешно изменено', 'success'));
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR
    });
    dispatch(setAlert('В категорию внести изменения не удалось', 'danger'));
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
