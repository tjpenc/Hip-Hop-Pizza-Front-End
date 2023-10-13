import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { deleteItem } from '../../api/itemData';

export default function ItemCard({ itemObj, onUpdate, isAddingItems }) {
  const deleteThisItem = () => deleteItem(itemObj.id).then(onUpdate);

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{itemObj.name}</Card.Title>
        <Card.Text>${itemObj.price}</Card.Text>
        {isAddingItems
          ? <Button variant="primary">Add to Order</Button>
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
  onUpdate: PropTypes.func.isRequired,
  isAddingItems: PropTypes.bool.isRequired,
};
