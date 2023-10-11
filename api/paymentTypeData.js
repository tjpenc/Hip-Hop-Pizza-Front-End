const dbUrl = 'https://localhost:7283';

const getPaymentTypes = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/paymentTypes`, {
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

const getSinglePaymentType = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/paymentTypes/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => resp.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getPaymentTypes,
  getSinglePaymentType,
};
