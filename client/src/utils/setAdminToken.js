import axios from 'axios';

const setAdminToken = admin_token => {
  if (admin_token) {
    axios.defaults.headers.common['admin_token'] = admin_token;
  } else {
    delete axios.defaults.headers.common['admin_token'];
  }
};

export default setAdminToken;
