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
  const [hasOrderItems, setHasOrderItems] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const getItemsForThisOrder = () => getItemsForOrder(id).then((orderItemsArray) => {
    setOrderItems(orderItemsArray);
    if (orderItemsArray.length > 0) {
      setHasOrderItems(true);
    }
  });

  useEffect(() => {
    getSingleOrder(id).then(setOrder);
    getItemsForThisOrder();
  }, [id]);

  return (
    <>
      <Link passHref href="/orders/orders">
        <Button className="m-3" variant="secondary">{'<--'} Back to Orders</Button>
      </Link>
      <div className="flex-center">
        <h1>{`${order.name}'s`} Order</h1>
      </div>
      <div className="flex-center m-3">
        <DetailedOrderCard key={order.id} orderObj={order} hasOrderItems={hasOrderItems} />
      </div>
      <h6>Customer Comments: {order.comments}</h6>
      <br />
      <div className="flexwrap">
        {orderItems?.map((orderItem) => <ItemCard key={orderItems.indexOf(orderItem)} itemObj={orderItem.item} orderObj={order} onUpdate={getItemsForThisOrder} />)}
      </div>
    </>
  );
}
