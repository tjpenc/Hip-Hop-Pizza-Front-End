import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { deleteOrder } from '../../api/orderData';

export default function DetailedOrderCard({ orderObj }) {
  const router = useRouter();
  const deleteThisOrder = (id) => deleteOrder(id).then(router.push('/orders/orders'));

  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          {orderObj.isOpen
            ? <Card.Title>Order Open</Card.Title>
            : (
              <>
                <Card.Title>Order Closed {orderObj.dateClosed}</Card.Title>
              </>
            )}
          <Card.Title>{orderObj.name}</Card.Title>
          <Card.Text>${orderObj.totalPrice}</Card.Text>
          <Card.Text>Phone: {orderObj.phone}</Card.Text>
          <Card.Text>Email: {orderObj.email}</Card.Text>
          <Card.Text>Order Type: {orderObj.orderType}</Card.Text>
          {orderObj.isOpen
            ? (
              <>
                <Button variant="danger" size="sm" onClick={() => deleteThisOrder(orderObj.id)}>Delete</Button>
                <Link passHref href={`/orders/edit/${orderObj.id}`}>
                  <Button variant="success" size="sm">Edit Customer</Button>
                </Link>
                <Link passHref href={`/addItems/${orderObj.id}`}>
                  <Button variant="primary" size="sm">Edit Items</Button>
                </Link>
                <Link passHref href={`/orders/closeOrder/${orderObj.id}`}>
                  <Button variant="primary" size="sm">Close Order</Button>
                </Link>
              </>
            ) : ''}
        </Card.Body>
      </Card>
    </>
  );
}

DetailedOrderCard.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    totalPrice: PropTypes.number,
    isOpen: PropTypes.bool,
    dateClosed: PropTypes.instanceOf(Date),
    phone: PropTypes.string,
    email: PropTypes.string,
    orderType: PropTypes.string,
  }).isRequired,
};
