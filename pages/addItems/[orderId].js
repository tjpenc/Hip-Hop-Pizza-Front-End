import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ItemCard from '../../components/Cards/ItemCard';
import { getItems } from '../../api/itemData';
import { getSingleOrder } from '../../api/orderData';
import { getItemsForOrder } from '../../api/orderItemData';

export default function AddItems() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState({});
  const [orderItems, setOrderItems] = useState([]);
  const router = useRouter();
  const { orderId } = router.query;

  useEffect(() => {
    getItems().then(setItems);
    getSingleOrder(orderId).then(setOrder);
    getItemsForOrder(orderId).then(setOrderItems);
  }, []);

  return (
    <>
      <h1>{`Add Items to ${order.name}'s Order`}</h1>
      <div>
        <h2>Items Added</h2>
        {orderItems?.map((orderItem) => <span key={orderItems.indexOf(orderItem)}>{orderItem.item.name}: ${orderItem.item.price} | </span>)}
      </div>
      <br />
      <h2>Menu</h2>
      {items?.map((item) => <ItemCard key={item.id} itemObj={item} orderObj={order} onUpdate={() => {}} isAddingItems />)}
      <br />
      <Link passHref href={`/orders/closeOrder/${orderId}`}>
        <Button>Continue to Checkout</Button>
      </Link>
    </>
  );
}

// put endpoint is created extra item
// get endpoint is not reading extra item
// maybe database is not updating as saving extra item bc it already exists?
