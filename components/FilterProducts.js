"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaFilter } from "react-icons/fa";

/**
 * Fetches the list of product categories from the API.
 * 
 * The function sends a GET request to the specified API endpoint to retrieve
 * categories. The request is cached with `force-cache`, and the response is
 * revalidated every 1800 seconds (30 minutes). 
 * 
 * @throws {Error} If the response from the API is not successful (i.e., `res.ok` is `false`).
 * 
 * @returns {Promise<Array<string>>} A promise that resolves to an array of categories as strings.
 */
async function fetchCategories() {
  const res = await fetch("https://next-ecommerce-api.vercel.app/categories", {
    cache: "force-cache",
    next: { revalidate: 1800 },
  });

  if (!res.ok) {
    throw error;
  }

  return res.json();
}

/**
 * CategoryFilter component that allows users to filter products by category.
 * 
 * This component provides a dropdown of categories fetched from an API and allows users to filter
 * the products list based on the selected category. The current selected category is synced
 * with the URL query parameters.
 * 
 * @component
 * @returns {JSX.Element} The rendered category filter component.
 */
export function CategoryFilter() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  /**
   * Sync the selected category with the query parameters on component load.
   * This effect reads the current category from the URL and updates the component state.
   */
  useEffect(() => {
    const category = searchParams.get("category") || "";
    setSelectedCategory(category);
  }, [searchParams]);

  /**
   * Fetch the list of categories when the component mounts.
   * This effect fetches the categories from the API and stores them in the component state.
   */
  useEffect(() => {
    async function loadCategories() {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        throw error;
      }
    }

    loadCategories();
  }, []);

  /**
   * Handle changes in the category dropdown.
   * When the user selects a category, the state is updated and the query parameters are
   * modified to reflect the selected category. The page is also reset to page 1.
   *
   * @param {Event} event - The change event from the category dropdown.
   */
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);

    // Update the URL search params with the selected category
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    params.set("page", "1"); // Reset to first page when changing category
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="mb-4">
      <div className="relative flex items-center space-x-2">
        <FaFilter className="text-[#2d7942]" />
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-52 px-4 py-2 bg-white text-black rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-[#2d7942] transition-all duration-300"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option
              key={category}
              value={category}
              className="px-4 py-2 text-gray-700 hover:bg-[#2d7942] hover:text-white transition-colors duration-300 rounded-md"
            >
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
