"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa"; // Import the search icon from react-icons

/**
 * SearchBar component that allows users to search for products.
 *
 * This component provides a search input that syncs with the URL query parameters and
 * allows users to search for products by entering a search query. When the form is
 * submitted, the search query is added to the URL, and the results are reset to the first page.
 *
 * @component
 * @returns {JSX.Element} The rendered search bar component.
 */
export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  /**
   * Sync the search query state with the URL query parameters on component load.
   * This effect reads the current search query from the URL and updates the component state.
   */
  useEffect(() => {
    const search = searchParams.get("search") || "";
    setSearchQuery(search);
  }, [searchParams]);

  /**
   * Handle the form submission for searching.
   * When the user submits the search form, the search query is added to the URL query parameters,
   * and the page is reset to the first page.
   *
   * @param {Event} event - The submit event triggered by form submission.
   */
  const handleSearch = (event) => {
    event.preventDefault();

    // Update the URL search params with the search query
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }
    params.set("page", "1"); // Reset to the first page when searching
    router.push(`/products?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="mb-4">
      <div className="flex">
        <div className="relative flex w-full max-w-md">
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search Products"
            className="flex-grow px-4 py-2 pl-6 text-gray-500 bg-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-[#2d7942] transition-all duration-300"
          />
          <button
            type="submit"
            className="absolute right-0 p-3 bg-[#2d7942] rounded-full text-white shadow-lg hover:bg-[#1d5931] transition-colors duration-300"
          >
            <FaSearch />
          </button>
        </div>
      </div>
    </form>
  );
}
