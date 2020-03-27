import axios from 'axios';

const setConsumerToken = consumer_token => {
  if (consumer_token) {
    axios.defaults.headers.common['consumer_token'] = consumer_token;
  } else {
    delete axios.defaults.headers.common['consumer_token'];
  }
};

export default setConsumerToken;
