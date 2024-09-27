"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaSortAmountDown } from "react-icons/fa";

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
      <div className="relative flex items-center space-x-2">
        <FaSortAmountDown className="text-[#2d7942]" /> 
        <select
          id="sort"
          value={sortOrder}
          onChange={handleSortChange}
          className="w-52 px-4 py-2 bg-white text-black rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-[#2d7942] transition-all duration-300 overflow-hidden"
        >
          <option value="">Sort: Default</option>
          <option
            value="asc"
            className="px-4 py-2 hover:bg-[#2d7942] hover:text-white transition-colors duration-300 rounded-md"
          >
            Price: Low to High
          </option>
          <option
            value="desc"
            className="px-4 py-2 hover:bg-[#2d7942] hover:text-white transition-colors duration-300 rounded-md"
          >
            Price: High to Low
          </option>
        </select>
      </div>
    </div>
  );
}
