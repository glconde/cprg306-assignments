"use client";

import Item from "./item.js";
//import itemData from "./items.json";
import { useState } from "react";

export default function ItemList({ items }) {
  const [sortBy, setSortBy] = useState("name");
  let itemData = items;
  const sortButtons = [
    // id match sortBy state
    {
      id: "name",
      label: "Name",
    },
    {
      id: "category",
      label: "Category",
    },
    {
      id: "groupcat",
      label: "Grouped Category",
    },
  ];

  let sortedData;
  // sort
  if (sortBy === "groupcat") {
    // extract unique category grouping and create an array to store items belonging to it
    const categoryTitles = itemData.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});

    // sort top level (categories)
    let sortedCategories = [];
    for (const cat in categoryTitles) {
      sortedCategories.push(cat);
    }
    sortedCategories.sort((a, b) => a.localeCompare(b));

    // sort inner
    sortedCategories.forEach((category) => {
      categoryTitles[category].sort((a, b) => a.name.localeCompare(b.name));
    });

    // format grouped category
    sortedData = sortedCategories.map((category) => ({
      itemGroup: category,
      items: categoryTitles[category],
    }));
  } else {
    // normal sort (sortBy state)
    sortedData = [...itemData].sort((a, b) =>
      a[sortBy].localeCompare(b[sortBy])
    );
  }

  // container style
  const listContainer = "p-4";
  const buttonContainer = "flex space-x-4 mb-4 ml-3";

  // button styles
  const buttonCore =
    "px-4 py-2 rounded-lg transition duration-200 min-w-[120px]";
  const buttonDefault = "bg-blue-600 text-white";
  const buttonActive = "bg-gray-200 hover:bg-gray-300 text-gray-800";

  // category label
  const groupingLabel = "font-bold text-lg text-blue-700 capitalize";

  return (
    <div className={listContainer}>
      <div className={buttonContainer}>
        {sortButtons.map((buttons) => (
          <button
            key={buttons.id}
            onClick={() => setSortBy(buttons.id)}
            className={`${buttonCore} ${
              sortBy === buttons.id ? buttonDefault : buttonActive
            }`}
          >
            {buttons.label}
          </button>
        ))}
      </div>

      <ul className="ml-2 space-y-2">
        {sortBy === "groupcat"
          ? sortedData.map(({ itemGroup, items }) => (
              <li key={itemGroup} className="list-none">
                <h2 className={groupingLabel}>{itemGroup}</h2>
                <ul className="ml-4 space-y-1">
                  {items.map((item) => (
                    <li key={item.id} className="list-none">
                      <Item {...item} />
                    </li>
                  ))}
                </ul>
              </li>
            ))
          : sortedData.map((item) => (
              <li key={item.id} className="list-none">
                <Item {...item} />
              </li>
            ))}
      </ul>
    </div>
  );
}
