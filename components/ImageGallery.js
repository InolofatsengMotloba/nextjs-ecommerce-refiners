"use client";
import { useState } from "react";

export function ImageGallery({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="w-full md:w-1/2">
      <div className="relative w-full">
        <img
          src={images[currentIndex]}
          alt={`Product Image: ${currentIndex + 1}`}
          className="w-full h-full object-contain rounded-lg shadow-lg transition-transform duration-500"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevClick}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-opacity-50 text-gray-800 p-2 rounded-full hover:bg-opacity-75"
            >
              ◀
            </button>
            <button
              onClick={handleNextClick}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-opacity-50 text-gray-800 p-2 rounded-full hover:bg-opacity-75"
            >
              ▶
            </button>
          </>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Image Gallery</h3>
        <div className="flex gap-4 overflow-x-auto p-8">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Gallery image ${index + 1}`}
              className={`w-32 h-32 object-contain rounded-lg shadow-lg cursor-pointer transition-transform duration-200 ${
                currentIndex === index
                  ? "scale-110 border-2 border-pink-500"
                  : ""
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function SingleImageGallery({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="w-full md:w-1/2">
      <div className="relative w-full">
        <img
          src={images[currentIndex]}
          alt={`Product Image: ${currentIndex + 1}`}
          className="w-full h-full object-contain rounded-lg shadow-lg transition-transform duration-500"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevClick}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-opacity-50 text-gray-800 p-2 rounded-full hover:bg-opacity-75"
            >
              ◀
            </button>
            <button
              onClick={handleNextClick}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-opacity-50 text-gray-800 p-2 rounded-full hover:bg-opacity-75"
            >
              ▶
            </button>
          </>
        )}
      </div>

    </div>
  );
}

