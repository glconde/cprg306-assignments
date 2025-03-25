"use client";
// g.conde 2025

import NewItem from "./new-item";
import ItemList from "./item-list";
import itemsData from "./items.json";
import MealIdeas from "./meal-ideas";
import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");
  const { user } = useUserAuth();

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const handleItemSelect = (item) => {
    // remove emojis
    let cleaned = item.name.replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      ""
    );
    const comma = cleaned.indexOf(",");
    // sanitize anything after first comma from the left (measurements, etc.)
    if (comma !== -1) {
      cleaned = cleaned.slice(0, comma);
    }
    setSelectedItemName(cleaned);
  };

  // not logged in
  if (!user) {
    return (
      <div className="text-blue-500 font-semibold">
        You need to be logged in to view this page.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping List</h1>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <NewItem onAddItem={handleAddItem} />
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <ItemList items={items} onItemSelect={handleItemSelect} />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-lg shadow-md p-6 h-full">
              <MealIdeas ingredient={selectedItemName} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
