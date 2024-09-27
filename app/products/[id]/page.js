import dynamic from "next/dynamic";
import { ImageGallery } from "@/components/ImageGallery";
import { ReviewsSort } from "@/components/SortReviews";

const BackButton = dynamic(() => import("@/components/BackButton"), {
  ssr: false,
});

/**
 * Fetches product details from the API.
 *
 * @param {string} id - The ID of the product to fetch.
 * @returns {Promise<Object>} A promise that resolves to a product object.
 * @throws {Error} Throws an error if the fetch request fails.
 */
async function fetchProduct(id) {
  const res = await fetch(
    `https://next-ecommerce-api.vercel.app/products/${id}`,
    {
      cache: "force-cache",
      next: { revalidate: 1800 },
    }
  );

  if (!res.ok) {
    throw error;
  }

  return res.json();
}

/**
 * The ProductDetails page component that displays detailed information about a single product.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.params - The route parameters.
 * @param {string} props.params.id - The ID of the product to display.
 * @returns {JSX.Element} The rendered ProductDetails page component.
 */
export default async function ProductDetails({ params }) {
  const { id } = params;
  // const product = await fetchProduct(id);

  let product;

  try {
    product = await fetchProduct(id);
  } catch (error) {
    throw error;
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

        {/* Product Details */}
        <div className="p-4 mt-6 md:mt-0 md:ml-8 flex-1">
          <h1 className="text-3xl font-bold mb-1">{product.title}</h1>
          <p className="text-sm text-gray-700 mb-4 border-b-black">
            {product.brand}
          </p>

          <p className="text-base text-gray-700 mb-2">{product.description}</p>
          <p className="text-lg text-gray-700 mb-2 border-b-black font-semibold">
            {product.category}
          </p>
          <div className="flex flex-wrap justify-between items-center mb-3">
            <button
              className={`text-sm font-medium ${
                product.stock > 0
                  ? "text-white bg-[#2d7942] px-2 py-1 rounded-md"
                  : "text-white bg-red-600 px-2 py-1 rounded-md"
              }`}
            >
              {product.stock > 0 ? "In stock" : "Out of stock"}
            </button>
            <p className="text-xl font-bold">$ {product.price}</p>
          </div>

          <p className="text-base text-black font-semibold mb-2">
            Rating: {product.rating}
          </p>

          <div className="flex flex-wrap items-center mb-4">
            <h3 className="mr-2 font-semibold">Tags:</h3>
            {product.tags.map((tag, index) => (
              <button
                key={index}
                className="border-2 font-bold border-black bg-white text-black m-1 px-2 py-1 rounded-md"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Reviews Section */}
      <ReviewsSort reviews={product.reviews} />
    </div>
  );
}
