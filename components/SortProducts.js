"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaSortAmountDown } from "react-icons/fa";

/**
 * PriceSort component for sorting products by price.
 *
 * This component provides a dropdown to sort products by price either in ascending or
 * descending order. The selected sort order is synced with the URL query parameters, and
 * updates the product list accordingly.
 *
 * @component
 * @returns {JSX.Element} The rendered PriceSort component.
 */
export default function PriceSort() {
  const [sortOrder, setSortOrder] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  /**
   * Sync the sort order state with the URL query parameters on component load.
   * This effect reads the current sort order from the URL and updates the component state.
   */
  useEffect(() => {
    const order = searchParams.get("order") || "";
    setSortOrder(order);
  }, [searchParams]);

  /**
   * Handle the change in sort order.
   * When the user selects a sort order (ascending/descending), it updates the URL query parameters
   * and resets the page to the first page.
   *
   * @param {Event} event - The change event triggered by selecting a sort option.
   */
  const handleSortChange = (event) => {
    const selectedOrder = event.target.value;
    setSortOrder(selectedOrder);

    // Update the URL search params with the sort order and reset page to 1
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
