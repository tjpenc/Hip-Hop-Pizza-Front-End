import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { deleteItem } from '../../api/itemData';
import { addOrderItem } from '../../api/orderItemData';

export default function ItemCard({
  itemObj, orderObj, onUpdate, isAddingItems, isOnMenu,
}) {
  const deleteThisItem = () => deleteItem(itemObj.id).then(onUpdate);
  const addItemToThisOrder = () => addOrderItem(orderObj.id, itemObj.id).then(onUpdate);
  const handleBodyClick = () => {
    if (isAddingItems) {
      addItemToThisOrder();
    }
  };

  return (
    <Card className={isAddingItems ? 'm-3 adding-items' : 'm-3'} style={{ width: '18rem' }}>
      <Card.Body onClick={handleBodyClick}>
        <Card.Title>{itemObj.name}</Card.Title>
        <Card.Text>${itemObj.price}</Card.Text>
        {isOnMenu
          ? (
            <>
              <Button className="m-3" variant="danger" size="sm" onClick={() => deleteThisItem(itemObj.id)}>Delete</Button>
              <Link passHref href={`/items/edit/${itemObj.id}`}>
                <Button variant="success">Edit Item</Button>
              </Link>
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
};

ItemCard.defaultProps = {
  orderObj: {
    id: 0,
    isOpen: true,
  },
  isAddingItems: false,
  isOnMenu: false,
};
