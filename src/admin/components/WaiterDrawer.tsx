import { X } from "lucide-react";
import { useEffect, useState } from "react";

import {
  addWaiter,
  updateWaiter,
} from "../services/waiterService";

type Props = {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  item: any;
};

export default function WaiterDrawer({
  open,
  onClose,
  onSaved,
  item,
}: Props) {
  const [form, setForm] = useState({
    name: "",
    pin: "",
    active: true,
    online: false,
  });

  useEffect(() => {
    if (item) {
      setForm({
        name: item.name || "",
        pin: item.pin || "",
        active: item.active ?? true,
        online: item.online ?? false,
      });
    } else {
      setForm({
        name: "",
        pin: "",
        active: true,
        online: false,
      });
    }
  }, [item, open]);

  async function handleSave() {
    try {
      const data = {
        ...form,
        pin: Number(form.pin),
      };

      if (item) {
        await updateWaiter(item.id, data);
      } else {
        await addWaiter(data);
      }

      onSaved();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Unable to save waiter.");
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">

      <div className="w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl">

        <div className="flex items-center justify-between p-6 border-b">

          <div>

            <h2 className="text-2xl font-bold">
              {item ? "Edit Waiter" : "Add Waiter"}
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Manage restaurant waiters
            </p>

          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X />
          </button>

        </div>

        <div className="p-6 space-y-5">

          <div>

            <label className="text-sm font-semibold">
              Waiter Name
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
            />

          </div>

          <div>

            <label className="text-sm font-semibold">
              4 Digit PIN
            </label>

            <input
              type="number"
              value={form.pin}
              onChange={(e) =>
                setForm({
                  ...form,
                  pin: e.target.value,
                })
              }
              className="w-full mt-2 border rounded-xl p-3"
            />

          </div>

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) =>
                setForm({
                  ...form,
                  active: e.target.checked,
                })
              }
            />

            Active Waiter

          </label>

        </div>

        <div className="border-t p-6 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl border"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-6 py-3 rounded-xl bg-olive text-white font-semibold"
          >
            {item ? "Update Waiter" : "Save Waiter"}
          </button>

        </div>

      </div>

    </div>
  );
}