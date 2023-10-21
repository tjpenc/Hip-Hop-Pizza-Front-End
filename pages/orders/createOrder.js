import OrderForm from '../../components/Forms/OrderForm';

export default function CreateOrder() {
  return (
    <>
      <br />
      <div className="flex-center">
        <h1>Open a New Order</h1>
      </div>
      <div className="order-form-container">
        <OrderForm orderObj={undefined} />
      </div>
    </>
  );
}
