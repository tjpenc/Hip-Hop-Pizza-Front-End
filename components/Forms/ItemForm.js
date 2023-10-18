import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createItem, updateItem } from '../../api/itemData';
import { updateOrderItem } from '../../api/orderItemData';

const initialState = {
  name: '',
  imageUrl: '',
  price: '',
};

export default function ItemForm({ itemObj, orderItemObj, isOrderItem }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  // when a field is filled, need to update state

  useEffect(() => {
    if (itemObj.id) {
      setFormInput(itemObj);
    }
  }, [itemObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isOrderItem) {
      createItem(formInput).then((item) => updateOrderItem(item.id, orderItemObj.id).then(router.push(`/addItems/${orderItemObj.orderId}`)));
    } else if (itemObj.id) {
      updateItem(formInput).then(router.push('/items/menu'));
    } else {
      createItem(formInput).then(router.push('/items/menu'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Item Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Item Name"
            name="name"
            value={formInput.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Image Url</Form.Label>
          <Form.Control
            type="text"
            placeholder="Image URL"
            name="imageUrl"
            value={formInput.imageUrl}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Item Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="Price"
            name="price"
            value={formInput.price}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button type="Submit">Submit</Button>
      </Form>
    </>
  );
}

ItemForm.propTypes = {
  itemObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
  }),
  orderItemObj: PropTypes.shape({
    id: PropTypes.number,
    orderId: PropTypes.number,
  }),
  isOrderItem: PropTypes.bool,
};

ItemForm.defaultProps = {
  itemObj: {
    name: '',
    price: PropTypes.number,
  },
  orderItemObj: {
    id: 0,
    orderId: 0,
  },
  isOrderItem: false,
};
