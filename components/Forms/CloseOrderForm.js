import Link from 'next/link';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { closeOrder, createRevenueNode } from '../../api/orderData';

const initialState = {
  id: 0,
  tip: 0,
  comments: '',
};

export default function CloseOrderForm() {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { id } = router.query;
  // when a field is filled, need to update state

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
    formInput.id = id;
    // closeOrder(formInput).then(router.push(`/orders/${id}`));
    closeOrder(formInput).then((order) => createRevenueNode(order).then(router.push(`/orders/${id}`)));
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Tip</Form.Label>
          <Form.Control
            type="text"
            placeholder="Tip"
            name="tip"
            value={formInput.tip}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Comments</Form.Label>
          <Form.Control
            type="text"
            placeholder="Please leave any comments the customer had"
            name="comments"
            value={formInput.comments}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button type="Submit">Close Order</Button>
        <Link passHref href={`/addItems/${id}`}>
          <Button variant="primary">Back to Menu</Button>
        </Link>
      </Form>
    </>
  );
}
