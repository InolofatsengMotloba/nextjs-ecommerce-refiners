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
    <div className="w-auto md:w-1/2">
      {/* Main Image */}
      <div className="relative w-full md:w-full h-96 ">
        <img
          src={images[currentIndex]}
          alt={`Product Image: ${currentIndex + 1}`}
          className="w-full h-full object-contain bg-gray-100 transition-transform duration-500"
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

      {/* Image Gallery */}
      <div className="mt-4 flex justify-center">
        <div className="flex gap-4 overflow-x-auto p-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Gallery image ${index + 1}`}
              className={`w-24 h-24 object-contain shadow-lg cursor-pointer transition-transform duration-200 ${
                currentIndex === index
                  ? "scale-110 border-2 bg-gray-100 border-b-black"
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
  <div className="relative w-full h-64 overflow-hidden"> 
    <img
      src={images[currentIndex]}
      alt={`Product Image: ${currentIndex + 1}`}
      className="w-full h-full object-contain bg-gray-100 transition-transform duration-500" 
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
);

}

