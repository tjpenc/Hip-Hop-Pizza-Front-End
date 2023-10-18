import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { deleteOrderItem } from '../../api/orderItemData';

export default function OrderItemCard({ orderItemObj, onUpdate }) {
  const deleteThisOrderItem = () => deleteOrderItem(orderItemObj.id).then(onUpdate);
  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{orderItemObj.item.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">${orderItemObj.item.price}</Card.Subtitle>
          <Link passHref href={`/addItems/edit/${orderItemObj.id}`}>
            <Button>Edit Item</Button>
          </Link>
          <Button onClick={deleteThisOrderItem}>Delete Item</Button>
        </Card.Body>
      </Card>
    </>
  );
}

OrderItemCard.propTypes = {
  orderItemObj: PropTypes.shape({
    id: PropTypes.number,
    item: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      price: PropTypes.number,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
