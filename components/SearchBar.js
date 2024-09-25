"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * A component that displays a search bar.
 *
 * @param {Object} props - The props for the component.
 * @param {string} props.initialSearch - The initial search query.
 * @returns {JSX.Element} The rendered SearchBar component.
 */
export default function SearchBar({ initialSearch }) {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (event) => {
    event.preventDefault();

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
      <label
        htmlFor="search"
        className="block text-sm font-medium text-gray-700"
      >
        Search Products:
      </label>
      <div className="flex">
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search products..."
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#2d7942]"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-[#2d7942] text-white rounded-r-lg hover:bg-[#1d5931] transition-colors duration-300"
        >
          Search
        </button>
      </div>
    </form>
  );
}
