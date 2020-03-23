import { v4 as uuidv4 } from 'uuid';
import { ALERT_SET, ALERT_REMOVE } from './types';

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuidv4();
  dispatch({
    type: ALERT_SET,
    payload: { msg, alertType, id }
  });

  setTimeout(() => dispatch({ type: ALERT_REMOVE, payload: id }), timeout);
};
