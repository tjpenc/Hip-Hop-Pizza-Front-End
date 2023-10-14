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
      <h1>Edit Item</h1>
      <ItemForm itemObj={item} />
    </>
  );
}
