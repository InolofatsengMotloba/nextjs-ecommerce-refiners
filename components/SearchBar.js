"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa"; // Import the search icon from react-icons

/**
 * A component that displays a search bar.
 *
 * @returns {JSX.Element} The rendered SearchBar component.
 */
export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  // Sync search query with URL query parameters on load
  useEffect(() => {
    const search = searchParams.get("search") || "";
    setSearchQuery(search);
  }, [searchParams]);

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
      <div className="flex items-center justify-center">
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
