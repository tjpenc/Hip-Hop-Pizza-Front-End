import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ItemCard from '../../components/Cards/ItemCard';
import { getItems } from '../../api/itemData';
import { getSingleOrder, updateOrderPrice } from '../../api/orderData';
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

  const getAllOrderItems = () => getItemsForOrder(orderId).then(setOrderItems).then(updateOrderPrice(orderId).then(setOrder));

  return (
    <>
      <h1>{`Add Items to ${order.name}'s Order`}</h1>
      <div>
        <h2>Items Added | Total Price: ${order.totalPrice}</h2>
        {orderItems?.map((orderItem) => (
          <span key={orderItems.indexOf(orderItem)}> {orderItem.item.name}: ${orderItem.item.price} |
          </span>
        ))}
      </div>
      <Link passHref href={`/orders/closeOrder/${orderId}`}>
        <Button>Continue to Checkout</Button>
      </Link>
      <br />
      <h2>Menu</h2>
      {items?.map((item) => <ItemCard key={item.id} itemObj={item} orderObj={order} onUpdate={getAllOrderItems} isAddingItems />)}
      <br />
    </>
  );
}
