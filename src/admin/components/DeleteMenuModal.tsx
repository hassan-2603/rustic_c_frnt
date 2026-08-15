import { deleteMenuItem } from "../services/menuService";
import { getLocalizedField } from "../../types";

type Props = {
  open: boolean;
  item: any;
  onClose: () => void;
  onDeleted: () => void;
};

export default function DeleteMenuModal({
  open,
  item,
  onClose,
  onDeleted,
}: Props) {
  if (!open || !item) return null;

  async function handleDelete() {
    try {
      await deleteMenuItem(item.id);

      onDeleted();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Unable to delete menu item.");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl">

        <h2 className="text-2xl font-bold mb-3">
          Delete Menu Item
        </h2>

        <p className="text-gray-600 mb-8">
          Are you sure you want to delete
          <span className="font-semibold">
            {" "}
            {getLocalizedField(item.name, "English")}
          </span>
          ?
        </p>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-5 py-3 border rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}