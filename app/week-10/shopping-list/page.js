"use client";
// g.conde 2025

import NewItem from "./new-item";
import ItemList from "./item-list";
//import itemsData from "./items.json";
import MealIdeas from "./meal-ideas";
import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import {
  getItems,
  addItem,
  removeItem,
} from "../_services/shopping-list-service";
//import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState("");
  const { user, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  // button design
  const buttonStyle =
    "text-white font-semibold py-2 px-4 rounded-md  transition duration-200 block w-[200px] text-l mb-5";

  const logoutStyle = "bg-red-600 hover:bg-red-700";
  const justifiedRight = "ml-auto";

  // async funtion load items
  async function loadItems() {
    // no user, no items
    if (!user || !user.uid) return;
    try {
      const newItems = await getItems(user.uid);
      setItems((i) => newItems);
    } catch (error) {
      console.error("Error loading items:", error);
    }
  }

  // listen to changes on user and items
  useEffect(() => {
    loadItems();
  }, [user, items]);

  const handleAddItem = async (newItem) => {
    // no user, no adding
    if (!user || !user.uid) return;
    console.log(newItem);
    try {
      // new id for new item.
      const newId = await addItem(user.uid, newItem);
      // add new item an id
      const addedItem = { id: newId, ...newItem };
      // update state
      setItems([...items, addedItem]);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleRemoveItem = async (targetItem) => {
    console.log("Removing item:", targetItem); // Debug
    //al{ert("Remove item: " + JSON.stringify(item)); // Test

    if (!user || !user.uid) return;
    try {
      await removeItem(user.uid, targetItem);
    } catch (error) {
      console.log("Error deleting item: ", error);
    }
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

  const handleLogout = async () => {
    try {
      router.replace("/week-10");
      //window.location.href = "/week-10";
    } catch (error) {
      console.log("Did not logout properly: ", error);
    }
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
        <div className="flex flex-row">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 flex-3">
            Shopping List
          </h1>
          <button
            className={`${buttonStyle} ${logoutStyle} ${justifiedRight}`}
            onClick={handleLogout}
          >
            <span>Logout</span>
          </button>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <NewItem onAddItem={handleAddItem} />
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <ItemList
                items={items}
                onItemSelect={handleItemSelect}
                onRemoveItem={handleRemoveItem}
              />
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
