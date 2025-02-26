"use client";

import Item from "./item.js";
import itemData from "./items.json";
import { useState, useEffect } from "react";

export default function ItemList() {
  const [sortBy, setSortBy] = useState("name");
  const [sortedData, setSortedData] = useState(itemData);

  useEffect(() => {
    if (sortBy === "groupcat") {
      // group by category
      const categoryTitles = itemData.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
      }, {});

      // sort categories
      const sortedCategories = Object.keys(categoryTitles).sort((a, b) =>
        a.localeCompare(b)
      );

      // sort inner
      sortedCategories.forEach((category) => {
        categoryTitles[category].sort((a, b) => a.name.localeCompare(b.name));
      });

      // format
      const formattedData = sortedCategories.map((category) => ({
        itemGroup: category,
        items: categoryTitles[category],
      }));
      console.log("Sorted Data (Group by Category):", formattedData);
      setSortedData(formattedData);
    } else {
      const data = [...itemData].sort((a, b) =>
        a[sortBy].localeCompare(b[sortBy])
      );
      console.log("Sorted Data (Default Sorting):", data);
      setSortedData(data);
    }
  }, [sortBy]);

  const handleSort = (sortKey) => {
    setSortBy(sortKey);
  };

  // container style
  const listContainer = "p-4 m";
  const buttonContainer = "flex space-x-4 mb-4 ml-3";

  // button styles
  const buttonCore = "px-4 py-2 rounded-lg transition duration-200 w-[120px]";
  const buttonDefault = "bg-blue-600 text-white";
  const buttonActive = "bg-gray-200 hover:bg-gray-300 text-gray-800";

  return (
    <div className={listContainer}>
      <div className={buttonContainer}>
        <button
          onClick={() => handleSort("name")}
          className={`${buttonCore} ${
            sortBy === "name" ? buttonDefault : buttonActive
          }`}
        >
          Name
        </button>
        <button
          onClick={() => handleSort("category")}
          className={`${buttonCore} ${
            sortBy === "category" ? buttonDefault : buttonActive
          }`}
        >
          Category
        </button>
        <button
          onClick={() => handleSort("groupcat")}
          className={`${buttonCore} ${
            sortBy === "groupcat" ? buttonDefault : buttonActive
          }`}
        >
          Grouped Category
        </button>
      </div>

      <ul className="ml-2 space-y-2">
        {sortBy === "groupcat"
          ? sortedData.map(({ itemGroup, items }, index) => (
              <li key={index} className="list-none">
                <h2 className="font-bold text-lg text-blue-700 capitalize">
                  {itemGroup}
                </h2>
                <ul className="ml-4 space-y-1">
                  {items && items.length > 0 ? (
                    items.map((item, index) => (
                      <li key={index} className="list-none">
                        <Item {...item} />
                      </li>
                    ))
                  ) : (
                    <li>No items available</li>
                  )}
                </ul>
              </li>
            ))
          : sortedData.map((item, index) => (
              <li key={index} className="list-none">
                <Item {...item} />
              </li>
            ))}
      </ul>
    </div>
  );
}
