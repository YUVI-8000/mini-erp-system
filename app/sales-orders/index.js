import { useEffect, useState } from 'react';

export default function SalesOrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('/api/sales-orders')
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div>
      <h1>Sales Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {order.customerName} - ${order.totalAmount}
          </li>
        ))}
      </ul>
    </div>
  );
}
