"use client";

import { useRouter } from "next/navigation";

/**
 * A button that resets all filters, search, and sort options,
 * and reloads the default product list.
 *
 * @returns {JSX.Element} The rendered ResetButton component.
 */
export default function ResetButton() {
  const router = useRouter();

  const handleReset = () => {
    // Clear all query parameters by navigating to the base products route
    router.push("/products");
  };

  return (
    <button
      onClick={handleReset}
      className="mb-8 px-4 py-2 bg-[#2d7942] text-white rounded-full shadow-md hover:bg-[#1e5b32] transition-colors duration-300"
    >
      Reset All Filters
    </button>
  );
}
