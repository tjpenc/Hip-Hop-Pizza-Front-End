import { useEffect, useState } from 'react';
import ItemCard from '../../components/Cards/ItemCard';
import { getItems } from '../../api/itemData';

export default function AddItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems().then(setItems);
  });

  return (
    <>
      {items.map((item) => <ItemCard itemObj={item} onUpdate={() => {}} isAddingItems />)}
    </>
  );
}
