import { addCategory } from "../admin/services/categoryService";

const categories = [
  "Cocktail",
  "Spirit",
  "Beer",
  "Wine",
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

export async function uploadCategories() {
  console.log("Starting upload...");

  for (const category of categories) {
    console.log("Uploading:", category);

    await addCategory({ name: category });

    console.log("Uploaded:", category);
  }

  console.log("DONE");
}
