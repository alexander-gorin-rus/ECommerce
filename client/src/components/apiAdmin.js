export const addProduct = (token, product) => {
  return fetch('/api/create-product', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `admin_token ${token}`
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
