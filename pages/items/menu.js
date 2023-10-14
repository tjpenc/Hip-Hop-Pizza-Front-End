import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getItems } from '../../api/itemData';
import ItemCard from '../../components/Cards/ItemCard';

export default function Menu() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems().then(setItems);
  }, []);

  const getAllItems = () => getItems().then(setItems);

  return (
    <>
      <h1>Menu</h1>
      {items?.map((item) => <ItemCard key={item.id} itemObj={item} orderObj={null} onUpdate={getAllItems} isAddingItems={false} />)}
      <br />
      <Link passHref href="/items/createItem">
        <Button>Add a New Item</Button>
      </Link>
    </>
  );
}
