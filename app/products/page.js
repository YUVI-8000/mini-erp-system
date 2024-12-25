"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all products from the API
    fetch("/api/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data); // Update state with fetched products
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (products.length === 0) {
    return <p>No products available. Please add a product.</p>;
  }

  return (
    <div>
      <h1>Product List</h1>
      <Link href="/products/new">
        <button>Add New Product</button>
      </Link>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>
              {product.name} - ${product.price}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
