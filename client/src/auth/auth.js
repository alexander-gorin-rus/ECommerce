export const isAuthenticated = () => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('consumer_token')) {
    return JSON.parse(localStorage.getItem('consumer_token'));
  } else {
    return false;
  }
};
