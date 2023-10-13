import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import DetailedOrderCard from '../../components/Cards/DetailedOrderCard';
import { getSingleOrder } from '../../api/orderData';

export default function ViewDetailedOrder() {
  const [order, setOrder] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const getThisOrder = () => getSingleOrder(id).then(setOrder);

  useEffect(() => {
    getThisOrder();
  }, [id]);

  return (
    <>
      <Link passHref href="/orders/orders">
        <Button>{'<--'} Back to Orders</Button>
      </Link>
      <h1>{`${order.name}'s`} Order</h1>
      <DetailedOrderCard key={order.id} orderObj={order} />;
    </>
  );
}
