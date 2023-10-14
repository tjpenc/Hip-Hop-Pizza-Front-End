import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { deleteItem } from '../../api/itemData';
import { addOrderItem } from '../../api/orderItemData';

export default function ItemCard({
  itemObj, orderObj, onUpdate, isAddingItems,
}) {
  const deleteThisItem = () => deleteItem(itemObj.id).then(onUpdate);
  const addItemToThisOrder = () => addOrderItem(orderObj.id, itemObj.id).then(console.warn('added item'));

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{itemObj.name}</Card.Title>
        <Card.Text>${itemObj.price}</Card.Text>
        {isAddingItems
          ? <Button variant="primary" onClick={addItemToThisOrder}>Add to Order</Button>
          : (
            <>
              <Button variant="danger" size="sm" onClick={() => deleteThisItem(itemObj.id)}>Delete</Button>
              <Button variant="success">Edit Item</Button>
            </>
          )}
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
  }),
  onUpdate: PropTypes.func.isRequired,
  isAddingItems: PropTypes.bool.isRequired,
};

ItemCard.defaultProps = {
  orderObj: {
    id: 0,
  },
};
