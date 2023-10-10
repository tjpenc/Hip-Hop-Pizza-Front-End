import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { deleteOrder } from '../../api/orderData';

export default function OrderCard({ orderObj, onUpdate }) {
  const deleteThisOrder = (id) => deleteOrder(id).then(onUpdate);

  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{orderObj.name}</Card.Title>
          {orderObj.isOpen
            ? <Card.Title>Order Closed</Card.Title>
            : <Card.Title>Order Open</Card.Title>}
          <Card.Text>${orderObj.totalPrice}</Card.Text>
          {orderObj.isOpen
            ? (
              <>
                <Button variant="danger" size="sm" onClick={() => deleteThisOrder(orderObj.id)}>Delete</Button>
                <Link passHref href={`/orders/edit/${orderObj.id}`}>
                  <Button variant="success" size="sm">Edit</Button>
                </Link>
              </>
            ) : ''}
          <Link passHref href={`orders/${orderObj.id}`}>
            <Button variant="primary" size="sm">Details</Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}

OrderCard.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    totalPrice: PropTypes.number,
    isOpen: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
