import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function SalesOrderForm() {
  const { register, handleSubmit } = useForm();
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const addItem = (productId, quantity) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setItems((prev) => [
        ...prev,
        {
          productId,
          quantity,
          unitPrice: product.price,
          totalPrice: quantity * product.price,
        },
      ]);
    }
  };

  const onSubmit = async (data) => {
    const totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0);
    await fetch('/api/sales-orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, items, totalAmount }),
    });
    router.push('/sales-orders');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('orderDate')} type="date" required />
      <input {...register('customerName')} placeholder="Customer Name" required />
      
      <div>
        <h3>Add Products</h3>
        <select id="productSelect">
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        <input type="number" id="quantityInput" placeholder="Quantity" />
        <button
          type="button"
          onClick={() =>
            addItem(
              document.getElementById('productSelect').value,
              parseInt(document.getElementById('quantityInput').value)
            )
          }
        >
          Add Item
        </button>
      </div>

      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.quantity} x {item.unitPrice} = {item.totalPrice}
          </li>
        ))}
      </ul>

      <button type="submit">Create Sales Order</button>
    </form>
  );
}
