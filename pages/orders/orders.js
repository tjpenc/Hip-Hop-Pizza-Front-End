import { useEffect, useState } from 'react';
import OrderCard from '../../components/Cards/OrderCard';
import { getOrders } from '../../api/orderData';

export default function ViewOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then(setOrders);
  }, []);

  return (
    <>
      <h1>All Orders</h1>
      {orders?.length === 0
        ? 'There are no orders in the system'
        : orders?.map((order) => <OrderCard key={order.id} orderObj={order} />)}
    </>
  );
}
