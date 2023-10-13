import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ItemCard from '../../components/Cards/ItemCard';
import { getItems } from '../../api/itemData';
import { getSingleOrder } from '../../api/orderData';

export default function AddItems() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState({});
  const router = useRouter();
  const { orderId } = router.query;

  useEffect(() => {
    getItems().then(setItems);
    getSingleOrder(orderId).then(setOrder);
  }, []);

  return (
    <>
      <h1>{`Add Items to ${order.name}'s Order`}</h1>
      <div>
        <h2>Items Added | Total Price ${order.totalPrice}</h2>
        {order.items.length > 0
          ? order?.items?.map((item) => <span>{item.name}: ${item.price}</span>)
          : 'No Items in Order'}
      </div>
      <br />
      <h2>Menu</h2>
      {items?.map((item) => <ItemCard key={item.id} itemObj={item} onUpdate={() => {}} isAddingItems />)}
      <br />
      <Link passHref href={`/orders/closeOrder/${orderId}`}>
        <Button>Continue to Checkout</Button>
      </Link>
    </>
  );
}
