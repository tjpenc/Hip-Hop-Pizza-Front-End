import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CloseOrderForm from '../../../components/Forms/CloseOrderForm';
import { getSingleOrder } from '../../../api/orderData';

export default function CloseOrder() {
  const [order, setOrder] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleOrder(id).then(setOrder);
  }, []);

  return (
    <>
      <br />
      <div className="flex-center">
        <h1>{`Checkout for ${order.name}'s Order`} | Total Price: ${`${order.totalPrice}
        `}
        </h1>
      </div>
      <div className="order-form-container">
        <CloseOrderForm />
      </div>
    </>
  );
}
