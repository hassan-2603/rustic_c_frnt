import { X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  addCategory,
  updateCategory,
} from "../services/categoryService";
import { getLocalizedField } from "../../types";

type Props = {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  item: any;
};

export default function CategoryDrawer({
  open,
  onClose,
  onSaved,
  item,
}: Props) {
  const [form, setForm] = useState({
    name: "",
    isActive: true,
  });

  useEffect(() => {
    if (item) {
      setForm({
        name: getLocalizedField(item.name, "English"),
        isActive: item.isActive ?? true,
      });
    } else {
      setForm({
        name: "",
        isActive: true,
      });
    }
  }, [item, open]);

  async function handleSave() {
    try {
      if (item) {
        await updateCategory(item.id, form);
      } else {
        await addCategory(form);
      }

      onSaved();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Unable to save category.");
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">

      <div className="w-full max-w-md bg-white h-full shadow-2xl overflow-y-auto">

        <div className="flex items-center justify-between p-6 border-b">

          <div>
            <h2 className="text-2xl font-bold">
              {item ? "Edit Category" : "Add Category"}
            </h2>

            <p className="text-gray-500 mt-1 text-sm">
              Manage restaurant categories
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X />
          </button>

        </div>

        <div className="p-6 space-y-6">

          <div>

            <label className="font-semibold text-sm">
              Category Name
            </label>

            <input
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full mt-2 border rounded-xl p-3"
              placeholder="Example: Burgers"
            />

          </div>

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) =>
                setForm({
                  ...form,
                  isActive: e.target.checked,
                })
              }
            />

            Active Category

          </label>

        </div>

        <div className="border-t p-6 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-5 py-3 border rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-6 py-3 rounded-xl bg-olive text-white font-semibold"
          >
            {item ? "Update Category" : "Save Category"}
          </button>

        </div>

      </div>

    </div>
  );
}