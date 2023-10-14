import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createItem, updateItem } from '../../api/itemData';

const initialState = {
  name: '',
  imageUrl: '',
  price: '',
};

export default function OrderForm({ itemObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  // when a field is filled, need to update state

  useEffect(() => {
    if (itemObj.id) {
      setFormInput(itemObj);
    }
    console.warn(itemObj);
  }, [itemObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.warn(formInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemObj.id) {
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

OrderForm.propTypes = {
  itemObj: PropTypes.shape({
    id: PropTypes.number,
    uid: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    orderType: PropTypes.bool,
    paymentTypeId: PropTypes.number,
  }),
};

OrderForm.defaultProps = {
  itemObj: PropTypes.shape({
    id: 0,
    uid: '',
    name: '',
    email: '',
    phone: '',
    orderType: false,
    paymentTypeId: 1,
  }),
};
