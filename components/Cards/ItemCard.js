import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { deleteItem } from '../../api/itemData';
import { addOrderItem, deleteOrderItem } from '../../api/orderItemData';

export default function ItemCard({
  itemObj, orderObj, onUpdate, isAddingItems, isOnMenu, isOnDetailedOrder,
}) {
  const deleteThisItem = () => deleteItem(itemObj.id).then(onUpdate);
  const addItemToThisOrder = () => addOrderItem(orderObj.id, itemObj.id).then(onUpdate);
  const removeItemFromThisOrder = () => deleteOrderItem(orderObj.id, itemObj.id).then(onUpdate);

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{itemObj.name}</Card.Title>
        <Card.Text>${itemObj.price}</Card.Text>
        {isAddingItems
          ? (
            <>
              <Button variant="primary" onClick={addItemToThisOrder}>Add to Order</Button>
            </>
          )
          : ''}
        {isOnMenu
          ? (
            <>
              <Button variant="danger" size="sm" onClick={() => deleteThisItem(itemObj.id)}>Delete</Button>
              <Link passHref href={`/items/edit/${itemObj.id}`}>
                <Button variant="success">Edit Item</Button>
              </Link>
            </>
          )
          : ''}
        {isOnDetailedOrder && orderObj.isOpen
          ? (
            <>
              <Button variant="danger" size="sm" onClick={removeItemFromThisOrder}>Delete From Order</Button>
            </>
          )
          : ''}
      </Card.Body>
    </Card>
  );
}

ItemCard.propTypes = {
  itemObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  orderObj: PropTypes.shape({
    id: PropTypes.number,
    isOpen: PropTypes.bool,
  }),
  onUpdate: PropTypes.func.isRequired,
  isAddingItems: PropTypes.bool,
  isOnMenu: PropTypes.bool,
  isOnDetailedOrder: PropTypes.bool,
};

ItemCard.defaultProps = {
  orderObj: {
    id: 0,
    isOpen: true,
  },
  isAddingItems: false,
  isOnMenu: false,
  isOnDetailedOrder: false,
};
