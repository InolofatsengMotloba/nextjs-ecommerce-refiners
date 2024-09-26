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
      className="mb-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300"
    >
      Reset All Filters
    </button>
  );
}
