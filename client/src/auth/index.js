export const adminAuth = () => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('admin_token')) {
    return JSON.parse(localStorage.getItem('admin_token'));
  } else {
    return false;
  }
};

export const consumerAuth = () => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('consumer_token')) {
    return JSON.parse(localStorage.getItem('consumer_token'));
  } else {
    return false;
  }
};
