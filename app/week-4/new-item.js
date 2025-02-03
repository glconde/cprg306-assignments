"use client";

import { useState } from "react";

// glc 2025

export default function NewItem() {
  // hooks
  const [quantity, setQuantity] = useState(1);

  // event handler
  const increment = () => {
    if (quantity < 20) {
      setQuantity((q) => q + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  // styles
  const buttonStyle =
    "px-4 py-2 text-white rounded transition duration-200 ease-in-out w-12 h-12";
  const buttonActiveStyle = "bg-blue-600 hover:bg-blue-700";
  const buttonDisabledStyle = "bg-gray-400 cursor-not-allowed";

  const outputStyle =
    "text-3xl font-semibold p-4 border rounded w-20 text-center";
  const componentContainer = "flex justify-center items-center gap-2";

  // return component
  return (
    <div className={componentContainer}>
      <span className={outputStyle}>{quantity}</span>
      <button
        className={`${buttonStyle} ${
          quantity === 1 ? buttonDisabledStyle : buttonActiveStyle
        }`}
        onClick={decrement}
      >
        -
      </button>
      <button
        className={`${buttonStyle} ${
          quantity === 20 ? buttonDisabledStyle : buttonActiveStyle
        }`}
        onClick={increment}
      >
        +
      </button>
    </div>
  );
}
