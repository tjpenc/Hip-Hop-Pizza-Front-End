import PropTypes from 'prop-types';
import Link from 'next/link';
import { deleteOrderItem } from '../../api/orderItemData';

export default function OrderItemCard({ orderItemObj, onUpdate, isOnDetailedOrder }) {
  const deleteThisOrderItem = () => deleteOrderItem(orderItemObj.id).then(onUpdate);
  return (
    <>
      {isOnDetailedOrder
        ? ''
        : (
          <div className="order-item black-border">
            <span>{orderItemObj.item.name}</span>
            <span>${orderItemObj.item.price}</span>
            <div className="order-item-button-container">
              <Link passHref href={`/addItems/edit/${orderItemObj.id}`}>
                <button type="button" className="order-item-button">Edit</button>
              </Link>
              <button type="button" className="order-item-button" onClick={deleteThisOrderItem}>X</button>
            </div>
          </div>
        )}
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
  isOnDetailedOrder: PropTypes.bool,
};

OrderItemCard.defaultProps = {
  isOnDetailedOrder: false,
};
