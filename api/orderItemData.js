const dbUrl = 'https://localhost:7283';

const addOrderItem = (orderId, itemId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/orders/items/${orderId}/${itemId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteOrderItem = (orderId, itemId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/orders/items/${orderId}/${itemId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const countSameItem = (orderId, itemId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/orders/items/${orderId}/${itemId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getItemsForOrder = (orderId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/orders/items/${orderId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => {
      if (resp.status === 404) {
        resolve([]);
      } else {
        resolve(resp.json());
      }
    })
    .catch(reject);
});

export {
  addOrderItem,
  deleteOrderItem,
  countSameItem,
  getItemsForOrder,
};
