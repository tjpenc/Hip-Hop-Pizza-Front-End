import ItemForm from '../../components/Forms/ItemForm';

export default function CreateItem() {
  return (
    <>
      <br />
      <div className="flex-center">
        <h1>Create Item</h1>
      </div>
      <div className="order-form-container">
        <ItemForm />
      </div>
    </>
  );
}
