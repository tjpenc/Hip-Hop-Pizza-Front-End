import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ItemForm from '../../../components/Forms/ItemForm';
import { getSingleOrderItem } from '../../../api/orderItemData';
import { getSingleItem } from '../../../api/itemData';

export default function EditOrderItem() {
  const [orderItem, setOrderItem] = useState({});
  const [item, setItem] = useState({});
  const router = useRouter();
  const { itemId } = router.query;

  useEffect(() => {
    getSingleOrderItem(itemId).then((orderItemObj) => {
      setOrderItem(orderItemObj);
      getSingleItem(orderItemObj.itemId).then(setItem);
    });
  }, [itemId]);

  return (
    <>
      <h1>Edit Item</h1>
      <ItemForm itemObj={item} orderItemObj={orderItem} isOrderItem />
    </>
  );
}
