"use client";

import dynamic from "next/dynamic";

/**
 * Dynamically imports the BackButton component.
 *
 * This component is loaded only on the client side (SSR is disabled)
 * to improve performance and reduce server-side rendering overhead.
 *
 * @constant {React.Component} BackButton
 *
 */
const BackButton = dynamic(() => import("@/components/BackButton"), {
  ssr: false,
});

export default function Error() {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <BackButton />
      <div className="flex flex-col justify-center items-center mt-24">
        <div className="text-center bg-gray-100 shadow-lg rounded-lg p-8 max-w-md m-auto">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="11"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01"
            />
          </svg>

          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Oops, Something Went Wrong!
          </h1>
          <p className="text-gray-600 mb-6">
            We encountered an error while fetching the product data. Please try
            again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#2d7942] text-white rounded hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-900"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
}

