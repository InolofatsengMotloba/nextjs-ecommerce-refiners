"use client";
import { useState, useEffect } from "react";

async function fetchProduct(id) {
  const res = await fetch(
    `https://next-ecommerce-api.vercel.app/products/${id}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export default function ProductDetails({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        const fetchedProduct = await fetchProduct(id);
        setProduct(fetchedProduct);
      } catch (err) {
        setError("Failed to load product. Please try again later.");
      }
    }

    loadProduct();
  }, [id]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <p>{product.title}</p>
    </div>
  );
}
