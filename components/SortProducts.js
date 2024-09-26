"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * A component that provides sorting options for products.
 * Users can sort by price in ascending, descending order, or choose no sorting.
 *
 * @returns {JSX.Element} The rendered PriceSort component.
 */
export default function PriceSort() {
  const [sortOrder, setSortOrder] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  // Sync sort order with the URL query parameters on load
  useEffect(() => {
    const order = searchParams.get("order") || "";
    setSortOrder(order);
  }, [searchParams]);

  const handleSortChange = (event) => {
    const selectedOrder = event.target.value;
    setSortOrder(selectedOrder);

    const params = new URLSearchParams(searchParams);
    if (selectedOrder === "") {
      params.delete("sortBy");
      params.delete("order");
    } else {
      params.set("sortBy", "price");
      params.set("order", selectedOrder);
    }
    params.set("page", "1"); // Reset to first page on sort
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="mb-4">
      <label htmlFor="sort" className="block text-sm font-medium text-gray-700">
        Sort by Price:
      </label>
      <select
        id="sort"
        value={sortOrder}
        onChange={handleSortChange}
        className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-[#2d7942] focus:border-[#2d7942]"
      >
        <option value="">Default</option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
    </div>
  );
}
