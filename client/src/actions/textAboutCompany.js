import { setAlert } from './alert';
import axios from 'axios';
import {
  CREATE_COMPANY_TEXT,
  UPDATE_COMPANY_TEXT,
  DELETE_COMPANY_TEXT,
  ERROR_COMPANY_TEXT,
  GET_COMPANY_TEXT,
  GET_COMPANY_TEXTS
} from './types';

//create text about company
export const createText = ({ text }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ text });

  try {
    const res = await axios.post('/api/create-text', body, config);

    dispatch({
      type: CREATE_COMPANY_TEXT,
      payload: res.data
    });
    dispatch(setAlert('Информационный текст успешно создан', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: ERROR_COMPANY_TEXT
    });
  }
};

export const getTexts = () => async dispatch => {
  try {
    const res = await axios.get('/api/texts');
    dispatch({
      type: GET_COMPANY_TEXTS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: ERROR_COMPANY_TEXT
    });
  }
};

export const deleteText = id => async dispatch => {
  try {
    await axios.delete(`api/delete-text/${id}`);
    dispatch({
      type: DELETE_COMPANY_TEXT,
      payload: id
    });
    dispatch(setAlert('Текст о компании успешно удален', 'success'));
  } catch (err) {
    dispatch({
      type: ERROR_COMPANY_TEXT
    });
  }
};
