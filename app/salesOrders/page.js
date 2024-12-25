"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function SalesOrdersPage() {
  const [salesOrders, setSalesOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/salesOrders")
      .then((res) => res.json())
      .then((data) => {
        setSalesOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching sales orders:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading sales orders...</p>;
  }

  if (salesOrders.length === 0) {
    return <p>No sales orders available. Please add a sales order.</p>;
  }

  return (
    <div>
      <h1>Sales Orders</h1>
      <Link href="/salesOrders/new">
        <button>Add New Sales Order</button>
      </Link>
      <ul>
        {salesOrders.map((order) => (
          <li key={order.id}>
            <Link href={`/salesOrders/${order.id}`}>
              {order.customerName} - {order.totalAmount}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
