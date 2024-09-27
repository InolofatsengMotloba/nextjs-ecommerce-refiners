"use client";

import { useState } from "react";

/**
 * ReviewsSort component for sorting and displaying product reviews.
 *
 * This component allows users to sort reviews based on the date (latest or earliest)
 * and rating (highest or lowest). It sorts the reviews accordingly and displays them with
 * the reviewer's name, date, comment, and rating stars.
 *
 * @component
 * @param {Object[]} reviews - The list of reviews to be sorted and displayed.
 * @param {string} reviews[].reviewerName - The name of the reviewer.
 * @param {number} reviews[].rating - The rating given by the reviewer (out of 5).
 * @param {string} reviews[].comment - The comment provided by the reviewer.
 * @param {string} reviews[].date - The date the review was created (ISO 8601 string).
 * @returns {JSX.Element} The rendered ReviewsSort component.
 */
export function ReviewsSort({ reviews }) {
  const [sortOrder, setSortOrder] = useState("latest");
  const [ratingSortOrder, setRatingSortOrder] = useState("highest");

  /**
   * Sorts the reviews based on the selected sort and rating order.
   *
   * Reviews are sorted first by rating, then by date. When sorting by rating,
   * if two reviews have the same rating, they will be sorted by date.
   *
   * @returns {Object[]} The sorted list of reviews.
   */
  const sortedReviews = [...reviews].sort((a, b) => {
    // Sort by rating
    if (ratingSortOrder === "highest") {
      if (b.rating !== a.rating) {
        return b.rating - a.rating; // highest rating first
      }
    } else if (ratingSortOrder === "lowest") {
      if (b.rating !== a.rating) {
        return a.rating - b.rating; // lowest rating first
      }
    }

    // Sort by date
    if (sortOrder === "latest") {
      return new Date(b.date) - new Date(a.date); // latest first
    } else if (sortOrder === "earliest") {
      return new Date(a.date) - new Date(b.date); // earliest first
    }

    return 0;
  });

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-extrabold">Reviews</h3>
        <div className="flex items-center">
          {/* Sort by Date */}
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-black  bg-gray-100 rounded-full shadow-sm px-3 py-2 mr-2 focus:outline-none focus:ring-[#2d7942] focus:border-[#2d7942]"
          >
            <option value="default">Sort: Date</option> {/* Default option */}
            <option value="latest">Latest Added</option>
            <option value="earliest">Earliest Added</option>
          </select>

          {/* Sort by Rating */}
          <select
            id="ratingSortOrder"
            value={ratingSortOrder}
            onChange={(e) => setRatingSortOrder(e.target.value)}
            className="border border-black  bg-gray-100 rounded-full shadow-sm px-3 py-2 focus:outline-none focus:ring-[#2d7942] focus:border-[#2d7942]"
          >
            <option value="default">Sort: Rating</option> {/* Default option */}
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
        </div>
      </div>

      {sortedReviews.length > 0 ? (
        sortedReviews.map((review) => (
          <div
            key={`${review.reviewerName}-${review.date}`}
            className="mb-4 border-b pb-4"
          >
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
