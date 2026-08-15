import { useEffect, useState } from "react";

import SectionHeader from "../components/SectionHeader";
import CategoryTable from "../components/CategoryTable";
import CategoryDrawer from "../components/CategoryDrawer";
import DeleteCategoryModal from "../components/DeleteCategoryModal";

import { getCategories } from "../services/categoryService";

export default function Categories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  async function loadCategories() {
    const data = await getCategories();
    setCategories(data);
  }

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="space-y-8">

      <SectionHeader
        title="Categories"
        subtitle="Manage restaurant categories"
      >
        <button
          onClick={() => {
            setSelectedCategory(null);
            setDrawerOpen(true);
          }}
          className="bg-olive text-white px-5 py-3 rounded-xl"
        >
          + Add Category
        </button>
      </SectionHeader>

      <CategoryTable
        categories={categories}
        onEdit={(category) => {
          setSelectedCategory(category);
          setDrawerOpen(true);
        }}
        onDelete={(category) => {
          setSelectedCategory(category);
          setDeleteOpen(true);
        }}
      />

      <CategoryDrawer
        open={drawerOpen}
        item={selectedCategory}
        onClose={() => setDrawerOpen(false)}
        onSaved={loadCategories}
      />

      <DeleteCategoryModal
        open={deleteOpen}
        item={selectedCategory}
        onClose={() => setDeleteOpen(false)}
        onDeleted={loadCategories}
      />

    </div>
  );
}