const dbUrl = 'https://localhost:7283';

const getOrders = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/orders`, {
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

const getSingleOrder = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/orders/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createOrder = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((resp) => resp.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateOrder = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/orders/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((resp) => resp.json)
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteOrder = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/orders/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const updateOrderPrice = (orderId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/orders/price/${orderId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const closeOrder = (orderPayload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/orders/${orderPayload.id}/close`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderPayload),
  })
    .then((resp) => resp.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  updateOrderPrice,
  closeOrder,
};
