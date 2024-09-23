"use client";

import { useState } from "react";

/**
 * A component that displays a search bar.
 *
 * @param {Object} props - The props for the component.
 * @param {string} props.initialSearch - The initial search query.
 * @returns {JSX.Element} The rendered SearchBar component.
 */
export default function SearchBar({ initialSearch }) {
  const [search, setSearch] = useState(initialSearch);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = search.trim();
    if (searchQuery) {
      window.location.href = `/products?page=1&search=${encodeURIComponent(
        searchQuery
      )}`;
    } else {
      window.location.href = `/products?page=1`;
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-6">
      <div className="flex">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
