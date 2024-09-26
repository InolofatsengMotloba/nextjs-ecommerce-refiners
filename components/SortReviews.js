"use client";

import { useState } from "react";

export function ReviewsSort({ reviews }) {
  const [sortOrder, setSortOrder] = useState("latest");
  const [ratingSortOrder, setRatingSortOrder] = useState("highest");

  // Sorting reviews based on selected order
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortOrder === "latest") {
      return new Date(b.date) - new Date(a.date); // latest first
    } else if (sortOrder === "earliest") {
      return new Date(a.date) - new Date(b.date); // earliest first
    }
  });

  // Sorting reviews by rating
  const ratingSortedReviews = sortedReviews.sort((a, b) => {
    if (ratingSortOrder === "highest") {
      return b.rating - a.rating; // highest rating first
    } else if (ratingSortOrder === "lowest") {
      return a.rating - b.rating; // lowest rating first
    }
  });

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      {/* Sort by Date */}
      <div className="flex items-center mb-4">
        <label htmlFor="sortOrder" className="mr-2 font-semibold">
          Sort by Date:
        </label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border px-2 py-1 rounded-md"
        >
          <option value="latest">Latest Added</option>
          <option value="earliest">Earliest Added</option>
        </select>
      </div>

      {/* Sort by Rating */}
      <div className="flex items-center mb-4">
        <label htmlFor="ratingSortOrder" className="mr-2 font-semibold">
          Sort by Rating:
        </label>
        <select
          id="ratingSortOrder"
          value={ratingSortOrder}
          onChange={(e) => setRatingSortOrder(e.target.value)}
          className="border px-2 py-1 rounded-md"
        >
          <option value="highest">Highest Rating</option>
          <option value="lowest">Lowest Rating</option>
        </select>
      </div>

      <h3 className="text-lg font-extrabold mb-4">Reviews</h3>
      {ratingSortedReviews.length > 0 ? (
        ratingSortedReviews.map((review) => (
          <div key={review.id} className="mb-4 border-b pb-4">
            <p className="font-bold">
              {review.reviewerName} -{" "}
              {new Date(review.date).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600 mt-2">{review.comment}</p>
            <div className="flex items-center mt-1">
              <div className="flex">
                {Array.from({ length: 5 }, (_, index) => (
                  <svg
                    key={index}
                    className={`w-4 h-4 ms-1 ${
                      index < Math.round(review.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500">No reviews yet.</p>
      )}
    </div>
  );
}
