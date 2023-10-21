import PropTypes from 'prop-types';
import Link from 'next/link';
import { deleteOrderItem } from '../../api/orderItemData';

export default function OrderItemCard({ orderItemObj, onUpdate }) {
  const deleteThisOrderItem = () => deleteOrderItem(orderItemObj.id).then(onUpdate);
  return (
    <div className="order-item black-border">
      <span>{orderItemObj.item.name}</span>
      <span>${orderItemObj.item.price}</span>
      <Link passHref href={`/addItems/edit/${orderItemObj.id}`}>
        <button type="button" className="order-item-button">Edit</button>
      </Link>
      <button type="button" className="order-item-button" onClick={deleteThisOrderItem}>X</button>
      {/* <Card style={{ width: '18rem', height: '5vh' }}>
        <Card.Body>
          <Card.Title>{orderItemObj.item.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">${orderItemObj.item.price}</Card.Subtitle>
          <Link passHref href={`/addItems/edit/${orderItemObj.id}`}>
            <Button>Edit Item</Button>
          </Link>
          <Button onClick={deleteThisOrderItem}>Delete Item</Button>
        </Card.Body>
      </Card> */}
    </div>
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
