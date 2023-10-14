import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import DetailedOrderCard from '../../components/Cards/DetailedOrderCard';
import { getSingleOrder } from '../../api/orderData';
import { getItemsForOrder } from '../../api/orderItemData';
import ItemCard from '../../components/Cards/ItemCard';

export default function ViewDetailedOrder() {
  const [order, setOrder] = useState({});
  const [orderItems, setOrderItems] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const getItemsForThisOrder = () => getItemsForOrder(id).then(setOrderItems);
  useEffect(() => {
    getSingleOrder(id).then(setOrder);
    getItemsForThisOrder();
  }, [id]);

  return (
    <>
      <Link passHref href="/orders/orders">
        <Button>{'<--'} Back to Orders</Button>
      </Link>
      <h1>{`${order.name}'s`} Order</h1>
      <DetailedOrderCard key={order.id} orderObj={order} />
      <br />
      {orderItems?.map((orderItem) => <ItemCard key={orderItems.indexOf(orderItem)} itemObj={orderItem.item} orderObj={order} onUpdate={getItemsForThisOrder} isOnDetailedOrder />)}
    </>
  );
}
