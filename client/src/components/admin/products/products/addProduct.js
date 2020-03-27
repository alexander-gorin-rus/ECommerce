import { API } from '../../../../config';
import axios from 'axios';

export const addProduct = ({ product }) => {
  axios
    .post('/api/create-product', {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: product
    })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};
