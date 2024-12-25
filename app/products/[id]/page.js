"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductDetailPage() {
  const { id } = useParams(); // Extract the product ID from the URL
  const [product, setProduct] = useState(null);
  console.log("Product ID:", id);
  // Fetch product details when the component loads
  useEffect(() => {
    if (!id) {
      console.error("Product ID is undefined. Check the URL or routing setup.");
      return; // Prevent the API call if ID is not defined
    }
  
    fetch(`/api/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch product: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);
  

  // Display a loading state while the product data is being fetched
  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {/* Back to Product List */}
      <Link href="/products">
        <button>Back to Product List</button>
      </Link>

      {/* Product Details */}
      <h1>Product Details</h1>
      <h2>{product.name}</h2>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Quantity:</strong> {product.quantity}</p>

      {/* Edit and Delete Buttons */}
      <div>
        <Link href={`/products/${id}/edit`}>
          <button>Edit Product</button>
        </Link>
        <button
          onClick={async () => {
            if (confirm("Are you sure you want to delete this product?")) {
              try {
                const response = await fetch(`/api/products/${id}`, {
                  method: "DELETE",
                });

                if (response.ok) {
                  alert("Product deleted successfully!");
                  window.location.href = "/products";
                } else {
                  alert("Failed to delete product.");
                }
              } catch (error) {
                console.error("Error deleting product:", error);
              }
            }
          }}
        >
          Delete Product
        </button>
      </div>
    </div>
  );
}
