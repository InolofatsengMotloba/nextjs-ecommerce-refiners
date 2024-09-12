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
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          {/* Product Image */}
          <div className="relative w-full">
            <img
              src={product.images[currentIndex]}
              alt={product.title}
              className="w-full h-full object-contain rounded-lg shadow-lg transition-transform duration-500"
            />
            {product.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevClick}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-opacity-50 text-gray-800 p-2 rounded-full hover:bg-opacity-75"
                >
                  ◀
                </button>
                <button
                  onClick={handleNextClick}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-opacity-50 text-gray-800 p-2 rounded-full hover:bg-opacity-75"
                >
                  ▶
                </button>
              </>
            )}
          </div>
          {/* Image Gallery */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Image Gallery</h3>
            <div className="flex gap-4 overflow-x-auto p-8">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className={`w-32 h-32 object-contain rounded-lg shadow-lg cursor-pointer transition-transform duration-200 ${
                    currentIndex === index
                      ? "scale-110 border-2 border-pink-500"
                      : ""
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 md:mt-0 md:ml-8 flex-1">
          <h1 className="text-3xl font-bold mb-6">{product.title}</h1>
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-semibold mb-2">
            Price: <span className="text-green-600">${product.price}</span>
          </p>
          <p className="text-sm text-gray-500 mb-2">
            Category: {product.category}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            {product.stock > 0 ? "In stock" : "Out of stock"}
          </p>

          {/* Product Reviews Section */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Reviews</h3>
            {product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <div key={review.id} className="mb-4 border-b pb-4">
                  <p className="font-medium">
                    {review.reviewerName} -{" "}
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">{review.comment}</p>
                  <p className="text-sm font-semibold">
                    Rating: ⭐ {review.rating}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
