import { requestAdminJson } from "./admin/services/adminApi";

const categories = [
  "Coffee / Barista",
  "Hot Beverages",
  "Cold Beverages",
  "Soft Drinks & Water",
  "Mocktails",
  "Fresh Juices",
  "Shakes, Lassi & Smoothies",
  "Eggs to Order",
  "Combo Breakfast",
  "Pancakes & Waffles",
  "Toasts & French Toast",
  "Cereals & Healthy Bowls",
  "Sandwiches",
  "Burgers",
  "Wraps & Rolls",
  "Pasta",
  "Pizza",
  "Appetizers / Starters",
  "Soups",
  "Salads",
  "Rice & Bowls",
  "Indian Specialties",
  "Continental Dishes",
  "Asian Favorites",
  "Fries & Sides",
  "Chef's Recommendation",
  "Something Sweet"
];

async function seedCategories() {
  for (const name of categories) {
    await requestAdminJson("/categories", {
      method: "POST",
      body: JSON.stringify({ name }),
    });

    console.log("Added:", name);
  }

  console.log("✅ All categories added!");
}

seedCategories();