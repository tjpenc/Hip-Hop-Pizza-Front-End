import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createOrder, updateOrder } from '../../api/orderData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  uid: '',
  name: '',
  email: '',
  phone: '',
  orderType: false,
};

export default function OrderForm({ orderObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();
  // when a field is filled, need to update state

  useEffect(() => {
    if (orderObj.id) {
      setFormInput(orderObj);
    }
  }, [orderObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addUid = () => {
    formInput.uid = user.uid;
  };

  const handleRadioChange = () => {
    if (!formInput.orderType) {
      formInput.orderType = 'In-person';
    } else {
      formInput.orderType = 'Phone';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRadioChange();
    addUid();
    if (orderObj.id) {
      updateOrder(formInput).then(router.push(`/orders/${orderObj.id}`));
    } else {
      createOrder(formInput).then((order) => router.push(`/addItems/${order.id}`));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Customer Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your Name"
            name="name"
            value={formInput.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Customer Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="email@example.com"
            name="email"
            value={formInput.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Customer Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="123-456-789"
            name="phone"
            value={formInput.phone}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Check
          className="mb-3"
          inline
          label="Phone Order?"
          name="orderType"
          type="checkbox"
          value={formInput.orderType}
          onChange={handleRadioChange}
          id="inline-checkbox-1"
        />
        <Button type="Submit">Submit</Button>
      </Form>
    </>
  );
}

OrderForm.propTypes = {
  orderObj: PropTypes.shape({
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
  orderObj: {
    id: 0,
    uid: '',
    name: '',
    email: '',
    phone: '',
    orderType: false,
    paymentTypeId: 1,
  },
};
