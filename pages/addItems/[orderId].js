import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ItemCard from '../../components/Cards/ItemCard';
import { getItems } from '../../api/itemData';
import { getSingleOrder, updateOrderPrice } from '../../api/orderData';
import { getItemsForOrder } from '../../api/orderItemData';
import OrderItemCard from '../../components/Cards/OrderItemCard';

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
  }, [orderId]);

  const getAllOrderItems = () => getItemsForOrder(orderId).then(setOrderItems).then(updateOrderPrice(orderId).then(setOrder));

  return (
    <>
      <h1>{`${order.name}'s Order`} | Total Price: ${order.totalPrice}</h1>
      <br />
      {orderItems.length >= 1
        ? (
          <div className="flex-center">
            <Link passHref href={`/orders/closeOrder/${orderId}`}>
              <Button variant="secondary" className="m-3" style={{ width: '20%' }}>Continue to Checkout</Button>
            </Link>
          </div>
        )
        : ''}
      <div className="addItemContainer">
        <div className="addItemColumn">
          <div className="flex-center">
            <h2>Items Added</h2>
          </div>
          <div className="flexwrap">
            {orderItems?.map((orderItem) => (
              <OrderItemCard key={orderItems.indexOf(orderItem)} orderItemObj={orderItem} onUpdate={getAllOrderItems} />
            ))}
          </div>
        </div>
        <div className="addItemColumn">
          <div className="flex-center">
            <h2>Menu</h2>
          </div>
          <div className="flex-center flexwrap">
            {items?.map((item) => <ItemCard key={item.id} itemObj={item} orderObj={order} onUpdate={getAllOrderItems} isAddingItems />)}
          </div>
        </div>
      </div>
    </>
  );
}
