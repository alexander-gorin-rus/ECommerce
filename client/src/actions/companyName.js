import {
  CREATE_COMPANY_NAME,
  UPDATE_COMPANY_NAME,
  DELETE_COMPANY_NAME,
  ERROR_COMPANY_NAME,
  GET_COMPANY_NAME,
  GET_COMPANY_NAMES
} from './types';
import { setAlert } from './alert';
import axios from 'axios';

//create text about company
export const createName = ({ name }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name });

  try {
    const res = await axios.post('/api/create-name', body, config);

    dispatch({
      type: CREATE_COMPANY_NAME,
      payload: res.data
    });
    dispatch(setAlert('Название компании успешно создано', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: ERROR_COMPANY_NAME
    });
  }
};

export const getNames = () => async dispatch => {
  try {
    const res = await axios.get('/api/get-company-names');
    dispatch({
      type: GET_COMPANY_NAMES,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: ERROR_COMPANY_NAME
    });
  }
};

export const deleteName = id => async dispatch => {
  try {
    await axios.delete(`api/delete-company-name/${id}`);
    dispatch({
      type: DELETE_COMPANY_NAME,
      payload: id
    });
    dispatch(setAlert('Название компании успешно удалено', 'success'));
  } catch (err) {
    dispatch({
      type: ERROR_COMPANY_NAME
    });
  }
};
