import { deleteWaiter } from "../services/waiterService";

type Props = {
  open: boolean;
  onClose: () => void;
  onDeleted: () => void;
  item: any;
};

export default function DeleteWaiterModal({
  open,
  onClose,
  onDeleted,
  item,
}: Props) {
  if (!open || !item) return null;

  async function handleDelete() {
    try {
      await deleteWaiter(item.id);

      onDeleted();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Unable to delete waiter.");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">

      <div className="bg-white rounded-2xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold">
          Delete Waiter
        </h2>

        <p className="text-gray-500 mt-3">
          Are you sure you want to delete
          <span className="font-semibold">
            {" "}
            {item.name}
          </span>
          ?
        </p>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl border"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="px-5 py-3 rounded-xl bg-red-600 text-white"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}