import dynamic from "next/dynamic";
import { ImageGallery } from "@/components/ImageGallery";

const BackButton = dynamic(() => import("@/components/BackButton"), {
  ssr: false,
});

async function fetchProduct(id) {
  const res = await fetch(
    `https://next-ecommerce-api.vercel.app/products/${id}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export default async function ProductDetails({ params }) {
  const { id } = params;
  let product;

  try {
    product = await fetchProduct(id);
  } catch (error) {
    return <p>Failed to load product. Please try again later.</p>;
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <BackButton />

      <div className="flex flex-col md:flex-row pt-5 mb-6">
        {/* Product Image */}
        <ImageGallery
          className="mt-6 md:mt-0 md:ml-8 flex-1"
          images={product.images}
        />

        <div className="p-4 mt-6 md:mt-0 md:ml-8 flex-1">
          <h1 className="text-3xl font-bold mb-1">{product.title}</h1>
          <p className="text-sm text-gray-700 mb-4 border-b-black">
            {product.brand}
          </p>
          <button
            className={`text-sm font-medium mb-6 ${
              product.stock > 0
                ? "text-white bg-[#2d7942] px-2 py-1 rounded-md"
                : "text-white bg-red-600 px-2 py-1 rounded-md"
            }`}
          >
            {product.stock > 0 ? "In stock" : "Out of stock"}
          </button>
          <p className="text-xl text-gray-700 mb-4 border-b-black">
            {product.description}
          </p>
          <p className="text-xl font-bold mb-4">$ {product.price}</p>
          <p className="text-lg text-gray-700 mb-4 border-b-black">
            {product.category}
          </p>
          {product.tags.map((tag, index) => (
            <button
              key={index}
              className="border-2 font-bold border-black bg-white text-black m-1 px-2 py-1 text-bold rounded-md mb-4"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

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
  );
}
