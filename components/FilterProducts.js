"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

async function fetchCategories() {
  const res = await fetch("https://next-ecommerce-api.vercel.app/categories");

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}

export function CategoryFilter({ initialCategory }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    async function loadCategories() {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
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
      <label
        htmlFor="category"
        className="block text-sm font-medium text-gray-700"
      >
        Filter by Category:
      </label>
      <select
        id="category"
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#2d7942] focus:border-[#2d7942]"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export function CategoryFilterWrapper({ initialCategory }) {
  return <CategoryFilter initialCategory={initialCategory} />;
}
