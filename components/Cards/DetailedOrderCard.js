import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { deleteOrder } from '../../api/orderData';

export default function DetailedOrderCard({ orderObj }) {
  const router = useRouter();
  const deleteThisOrder = (id) => deleteOrder(id).then(router.push('/orders/orders'));

  const convertDate = () => {
    const date = new Date(Date.parse(orderObj.dateClosed));
    return `${date.getFullYear()}/${(date.getMonth() + 1)}/${(date.getUTCDate())}`;
  };

  return (
    <>
      <Card style={{ width: '50%' }}>
        <Card.Body>
          {orderObj.isOpen
            ? <Card.Title>Order Open</Card.Title>
            : (
              <>
                <Card.Title>Order Closed {convertDate()}</Card.Title>
              </>
            )}
          <Card.Title>Customer: {orderObj.name}</Card.Title>
          <Card.Text>Price: ${orderObj.totalPrice}</Card.Text>
          <Card.Text>Phone: {orderObj.phone}</Card.Text>
          <Card.Text>Email: {orderObj.email}</Card.Text>
          <Card.Text>Order Type: {orderObj.orderType}</Card.Text>
          <Button className="m-1" variant="danger" size="sm" onClick={() => deleteThisOrder(orderObj.id)}>Delete</Button>
          {orderObj.isOpen
            ? (
              <>
                <Link passHref href={`/orders/edit/${orderObj.id}`}>
                  <Button className="m-1" variant="warning" size="sm">Edit Customer</Button>
                </Link>
                <Link passHref href={`/addItems/${orderObj.id}`}>
                  <Button className="m-1" variant="success" size="sm">Add Items</Button>
                </Link>
                <Link passHref href={`/orders/closeOrder/${orderObj.id}`}>
                  <Button className="m-1" variant="primary" size="sm">Close Order</Button>
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
    dateClosed: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    orderType: PropTypes.string,
  }).isRequired,
};
