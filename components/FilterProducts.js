"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaFilter } from "react-icons/fa"; 

async function fetchCategories() {
  const res = await fetch("https://next-ecommerce-api.vercel.app/categories");

  if (!res.ok) {
    throw error;
  }

  return res.json();
}

export function CategoryFilter() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  // Sync the filter state with the query parameters on load
  useEffect(() => {
    const category = searchParams.get("category") || "";
    setSelectedCategory(category);
  }, [searchParams]);

  // Fetch categories when component mounts
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

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);

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
