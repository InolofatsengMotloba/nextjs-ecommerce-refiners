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
    <div className="grid items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Products - Page {page}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {product.title}
          </h2>
        ))}
      </div>
    </div>
  );
}
