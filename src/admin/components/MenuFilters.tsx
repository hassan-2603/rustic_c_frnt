import { useEffect, useState } from "react";
import { getCategories } from "../services/categoryService";

type Props = {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

export default function MenuFilters({
  selectedCategory,
  onCategoryChange,
}: Props) {
  const [categories, setCategories] = useState<any[]>([]);
  const [veg, setVeg] = useState("All");
  const [availability, setAvailability] = useState("All");

  useEffect(() => {
    async function loadCategories() {
      const data = await getCategories();
      setCategories(data);
    }

    loadCategories();
  }, []);

  return (
    <div className="flex flex-wrap gap-3">

      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-olive/30"
      >
        <option value="All">All Categories</option>

        {categories.map((cat) => (
          <option
            key={cat.id}
            value={cat.name}
          >
            {cat.name}
          </option>
        ))}
      </select>

      <select
        value={veg}
        onChange={(e) => setVeg(e.target.value)}
        className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-olive/30"
      >
        <option>All Items</option>
        <option>Veg</option>
        <option>Non Veg</option>
      </select>

      <select
        value={availability}
        onChange={(e) => setAvailability(e.target.value)}
        className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-olive/30"
      >
        <option>Availability</option>
        <option>Available</option>
        <option>Unavailable</option>
      </select>

    </div>
  );
}