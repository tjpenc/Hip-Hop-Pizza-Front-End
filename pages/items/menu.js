import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getItems } from '../../api/itemData';
import ItemCard from '../../components/Cards/ItemCard';

export default function Menu() {
  const [items, setItems] = useState([]);

  const getAllItems = () => getItems().then(setItems);

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <>
      <h1>Menu</h1>
      <Link passHref href="/items/createItem">
        <Button variant="secondary">Add a New Item</Button>
      </Link>
      <br />
      <br />
      <div className="flex-space-between align-items">
        {items?.map((item) => <ItemCard key={item.id} itemObj={item} orderObj={undefined} onUpdate={getAllItems} isOnMenu />)}
      </div>
      <br />
    </>
  );
}
