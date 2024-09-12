import Link from "next/link";
import { SingleImageGallery } from "@/components/ImageGallery";

export const dynamic = "force-dynamic"; // Ensure the page always fetches fresh data.

async function fetchProducts(page = 1) {
  const skip = (page - 1) * 20;
  const res = await fetch(
    `https://next-ecommerce-api.vercel.app/products?limit=20&skip=${skip}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function Products({ searchParams }) {
  const page = searchParams.page || 1;
  let products;

  try {
    products = await fetchProducts(page);
  } catch (error) {
    return <p>Failed to load products. Please try again later.</p>;
  }

  return (
    <div className=" max-w-6xl mx-auto p-8  pb-12 gap-8 sm:p-12 min-h-screen">
      <h1 className="grid items-center justify-items-center text-2xl font-bold mb-6">
        PRODUCTS
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <SingleImageGallery images={product.images} />
            <div className="p-3">
              <h2 className="text-base font-semibold text-gray-800 truncate">
                {product.title}
              </h2>
              <p className="text-gray-800 font-bold mt-1">${product.price}</p>
              <p className="text-gray-500 text-xs">{product.category}</p>
              <Link href={`/products/${product.id}`}>
                <button className="bg-black text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-gray-600 transition-colors duration-300">
                  Product Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Pagination currentPage={page} />
    </div>
  );
}

function Pagination({ currentPage }) {
  const pageNumber = parseInt(currentPage, 10);
  const prevPage = pageNumber > 1 ? pageNumber - 1 : null;
  const nextPage = pageNumber + 1;

  return (
    <div className="flex justify-center items-center mt-8 space-x-2">
      {prevPage && (
        <Link href={`/products?page=${prevPage}`}>
          <button className="px-4 py-2 bg-[#2d7942] text-white rounded-lg hover:bg-[#1d5931] transition-colors duration-300">
            Previous
          </button>
        </Link>
      )}
      <span className="text-lg">Page {currentPage}</span>
      <Link href={`/products?page=${nextPage}`}>
        <button className="px-4 py-2 bg-[#2d7942] text-white rounded-lg hover:bg-[#1d5931] transition-colors duration-300">
          Next
        </button>
      </Link>
    </div>
  );
}
