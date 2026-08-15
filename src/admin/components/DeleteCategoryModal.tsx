import { deleteCategory } from "../services/categoryService";

type Props = {
  open: boolean;
  item: any;
  onClose: () => void;
  onDeleted: () => void;
};

export default function DeleteCategoryModal({
  open,
  item,
  onClose,
  onDeleted,
}: Props) {
  if (!open || !item) return null;

  async function handleDelete() {
    try {
      await deleteCategory(item.id);

      onDeleted();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Unable to delete category.");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">

        <h2 className="text-2xl font-bold mb-3">
          Delete Category
        </h2>

        <p className="text-gray-600 mb-8">
          Are you sure you want to delete
          <span className="font-semibold">
            {" "}
            {item.name}
          </span>
          ?
        </p>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl border"
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