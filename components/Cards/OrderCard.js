import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { deleteOrder } from '../../api/orderData';

export default function OrderCard({ orderObj, onUpdate }) {
  const deleteThisOrder = (id) => deleteOrder(id).then(() => onUpdate());

  return (
    <>
      <Card className="m-3" style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{orderObj.name}</Card.Title>
          {orderObj.isOpen
            ? <Card.Title>Order Open</Card.Title>
            : <Card.Title>Order Closed</Card.Title>}
          <Card.Text>${orderObj.totalPrice}</Card.Text>
          {orderObj.isOpen
            ? (
              <>
                <Link passHref href={`/orders/edit/${orderObj.id}`}>
                  <Button variant="warning" className="m-3" size="sm">Edit Customer</Button>
                </Link>
                <Link passHref href={`/addItems/${orderObj.id}`}>
                  <Button variant="success" className="m-3" size="sm">Add Items</Button>
                </Link>
              </>
            ) : ''}
          <Button variant="danger" size="sm" className="m-3" onClick={() => deleteThisOrder(orderObj.id)}>Delete</Button>
          <Link passHref href={`/orders/${orderObj.id}`}>
            <Button variant="primary" className="m-3" size="sm">Details</Button>
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
