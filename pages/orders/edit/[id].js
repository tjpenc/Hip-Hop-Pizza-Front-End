import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import OrderForm from '../../../components/Forms/OrderForm';
import { getSingleOrder } from '../../../api/orderData';

export default function EditOrder() {
  const [order, setOrder] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleOrder(id).then(setOrder);
  }, []);

  return (
    <>
      <h1>Edit Customer Details</h1>
      <OrderForm orderObj={order} />
    </>
  );
}
