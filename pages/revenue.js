import { useEffect, useState } from 'react';
import { getTotalRevenue } from '../api/orderData';

export default function Revenue() {
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    getTotalRevenue().then(setRevenue);
  });

  return (
    <>
      <h1>Total Revenue</h1>
      <h2>${revenue}</h2>
    </>
  );
}
