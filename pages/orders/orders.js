import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import OrderCard from '../../components/Cards/OrderCard';
import { getOrders } from '../../api/orderData';

export default function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');

  const getAllOrders = () => getOrders().then(setOrders);
  const getOpenOrders = () => {
    getOrders().then((orderArray) => {
      const openOrders = orderArray.filter((_orders) => _orders.isOpen);
      setOrders(openOrders);
    });
  };

  const getClosedOrders = () => {
    getOrders().then((orderArray) => {
      const closedOrders = orderArray.filter((_orders) => !_orders.isOpen);
      setOrders(closedOrders);
    });
  };

  const filterOrders = (string) => {
    setFilterStatus(string);
    if (!string) {
      getAllOrders();
    } else if (string === 'Open') {
      getOpenOrders();
    } else if (string === 'Closed') {
      getClosedOrders();
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <>
      <div className="flex">
        <h1>{filterStatus ? `${filterStatus} Orders` : 'All Orders'}</h1>
        <Button variant="primary" onClick={() => filterOrders('')}>All orders</Button>
        <Button variant="primary" onClick={() => filterOrders('Open')}>Open Orders</Button>
        <Button variant="primary" onClick={() => filterOrders('Closed')}>Closed orders</Button>
      </div>
      <br />
      <div className="flex">
        {orders?.length === 0
          ? 'There are no orders in the system'
          : orders?.map((order) => <OrderCard key={order.id} orderObj={order} onUpdate={getAllOrders} />)}
      </div>
    </>
  );
}
