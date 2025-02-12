"use client";

import { useState } from "react";

// glc 2025

export default function NewItem() {
  // hooks
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("produce");
  const [error, setError] = useState("");

  // JSON categories
  const categories = [
    { name: "Produce", category: "produce" },
    { name: "Dairy", category: "dairy" },
    { name: "Bakery", category: "bakery" },
    { name: "Meat", category: "meat" },
    { name: "Frozen Foods", category: "frozen foods" },
    { name: "Canned Goods", category: "canned goods" },
    { name: "Dry Goods", category: "dry goods" },
    { name: "Beverages", category: "beverages" },
    { name: "Snacks", category: "snacks" },
    { name: "Household", category: "household" },
    { name: "Other", category: "other" },
  ];

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

  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim()) {
      setError("Item name is required.");
      return;
    }
    setError("");

    window.alert(`Item: ${name}\nQuantity: ${quantity}\nCategory: ${category}`);

    setCategory("produce");
    setName("");
    setQuantity(1);
  };

  // styles
  const buttonStyle =
    "px-4 py-2 text-white rounded transition duration-200 ease-in-out w-12 h-12";
  const buttonActiveStyle = "bg-blue-600 hover:bg-blue-700";
  const buttonDisabledStyle = "bg-gray-400 cursor-not-allowed";
  const outputStyle =
    "text-3xl font-semibold p-4 border rounded w-20 text-center";
  const selectStyle =
    "px-4 py-2 text-black rounded transition duration-200 ease-in-out border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const formStyle =
    "flex flex-col items-center gap-4 p-6 border rounded shadow-md w-80 mx-auto mt-10";
  const buttonContainer = "flex gap-2 items-center";
  const full = "w-full py-2";
  const errorStyle = "text-red-500 text-sm mt-1";
  const inputContainer = "w-64";
  const inputStyle =
    "w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <form onSubmit={handleSubmit} className={formStyle}>
      <div className={inputContainer}>
        <input
          id="txtName"
          type="text"
          className={inputStyle}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          placeholder="Item Name"
        />
        {error && <p className={errorStyle}>{error}</p>}
      </div>
      <div className={buttonContainer}>
        <button
          type="button"
          className={`${buttonStyle} ${
            quantity === 1 ? buttonDisabledStyle : buttonActiveStyle
          }`}
          onClick={decrement}
          disabled={quantity === 1}
        >
          -
        </button>
        <span className={outputStyle}>{quantity}</span>
        <button
          type="button"
          className={`${buttonStyle} ${
            quantity === 20 ? buttonDisabledStyle : buttonActiveStyle
          }`}
          onClick={increment}
          disabled={quantity === 20}
        >
          +
        </button>
      </div>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={`${selectStyle} ${full}`}
      >
        {categories.map((cat, index) => (
          <option key={index} value={cat.category}>
            {cat.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className={`${buttonStyle} ${buttonActiveStyle} ${full}`}
      >
        Add Item
      </button>
    </form>
  );
}
