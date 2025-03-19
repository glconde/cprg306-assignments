"use client";

import { useEffect, useState } from "react";

// fetch data from api
async function fetchMealIdeas(ingredient) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    const data = await response.json();
    console.log(data);
    return data.meals || [];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function loadMealIdeas() {
      // call fetch function
      const mealsData = await fetchMealIdeas(ingredient);
      // store result to meals state var
      setMeals(mealsData);
    }
    // don't fetch if no ingredient
    if (ingredient) {
      loadMealIdeas();
    }
    // call whenever ingredient changes
  }, [ingredient]);

  return ingredient ? (
    <div>
      <h2 className="font-bold text-blue-700 mt-5">
        Meal ideas using {ingredient}
      </h2>
      <ul className="ml-4 space-y-1">
        {meals.length > 0 ? (
          meals.map((meal) => (
            <li key={meal.idMeal} className="list-none mb-2">
              <span className="text-blue-500 font-semibold">
                {meal.strMeal}
              </span>
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-20 h-20"
              />
            </li>
          ))
        ) : (
          <li className="list-none">No meals found.</li>
        )}
      </ul>
    </div>
  ) : (
    <div className="text-blue-700 font-bold mt-5">
      Select an ingredient on the left
    </div>
  );
}
