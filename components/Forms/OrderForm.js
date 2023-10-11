import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createOrder } from '../../api/orderData';
import { useAuth } from '../../utils/context/authContext';
import { getPaymentTypes } from '../../api/paymentTypeData';

const initialState = {
  uid: '',
  name: '',
  email: '',
  phone: '',
  orderType: false,
  paymentTypeId: 1,
};

export default function OrderForm() {
  const [formInput, setFormInput] = useState(initialState);
  const [paymentTypes, setPaymentTypes] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  // when a field is filled, need to update state

  useEffect(() => {
    setFormInput((prevState) => ({
      ...prevState,
      uid: user.uid,
    }));
    getPaymentTypes().then(setPaymentTypes);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRadioChange = () => {
    if (!formInput.orderType) {
      formInput.orderType = 'Dine-In';
    } else {
      formInput.orderType = 'Takeout';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRadioChange();
    createOrder(formInput).then((order) => router.push(`/addItems/${order.id}`));
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
        <Form.Select
          aria-label="Default select example"
          name="paymentTypeId"
          onChange={handleChange}
          value={formInput.paymentTypeId}
          required
        >
          <option value="">Please Select an Option</option>
          {paymentTypes?.map((paymentType) => (
            <option key={paymentType.id} value={paymentType.id}>{paymentType.type}</option>
          ))}
        </Form.Select>
        <Form.Check
          className="mb-3"
          inline
          label="Takeout"
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
