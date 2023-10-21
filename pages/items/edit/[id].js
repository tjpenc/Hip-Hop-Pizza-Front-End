import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ItemForm from '../../../components/Forms/ItemForm';
import { getSingleItem } from '../../../api/itemData';

export default function EditItem() {
  const [item, setItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleItem(id).then(setItem);
  }, []);

  return (
    <>
      <br />
      <div className="flex-center">
        <h1>Edit Item</h1>
      </div>
      <div className="order-form-container">
        <ItemForm itemObj={item} />
      </div>
    </>
  );
}
