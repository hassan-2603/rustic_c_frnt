import { X, QrCode, Trash2, Printer, AlertTriangle } from "lucide-react";

import TableStatusBadge from "./TableStatusBadge";
import { freeTable, deleteTable } from "../services/tableService";
import { getTableDisplayName } from "../../utils/tableUtils";

type Props = {
  open: boolean;
  table: any;
  onClose: () => void;
};

export default function TableDetailsDrawer({
  open,
  table,
  onClose,
}: Props) {
  if (!open || !table) return null;

  async function handleFreeTable() {
    if (
      !confirm(
        `Free ${getTableDisplayName(table)}?`
      )
    )
      return;

    await freeTable(table.id);

    onClose();
  }

  async function handleDeleteTable() {
    if (
      !confirm(
        `Permanently delete ${getTableDisplayName(table)}? Any customer using this table link will no longer be able to access the menu.`
      )
    )
      return;

    await deleteTable(table.id);

    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-end z-50">

      <div className="w-full max-w-lg bg-white h-full overflow-y-auto shadow-2xl">

        {/* Header */}

        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">

          <div>

            <h2 className="text-2xl font-bold">
              {getTableDisplayName(table)}
            </h2>

            <p className="text-gray-500 mt-1">
              {table.areaLabel || "Restaurant Table"}
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

          {/* Status */}

          <div className="border rounded-2xl p-5">

            <h3 className="font-semibold mb-4">
              Current Status
            </h3>

            <TableStatusBadge
              status={table.status}
            />

          </div>

          {/* Information */}

          <div className="border rounded-2xl p-5 space-y-4">

            <h3 className="font-semibold">
              Table Information
            </h3>

            <div className="flex justify-between">

              <span className="text-gray-500">
                Area
              </span>

              <span className="font-semibold">
                {table.areaLabel || table.area || "-"}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-500">
                Occupied
              </span>

              <span className="font-semibold">
                {table.occupied
                  ? "Yes"
                  : "No"}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-500">
                Current Order
              </span>

              <span className="font-semibold">

                {table.currentOrderId
                  ? table.currentOrderId.slice(0, 8)
                  : "--"}

              </span>

            </div>

          </div>

          {/* Actions */}

          <div className="border rounded-2xl p-5">

            <h3 className="font-semibold mb-5">
              Actions
            </h3>

            <div className="space-y-3">

              <button
                className="w-full flex items-center justify-center gap-3 border py-3 rounded-xl hover:bg-gray-50"
              >
                <QrCode size={18} />
                Generate QR
              </button>

              <button
                className="w-full flex items-center justify-center gap-3 border py-3 rounded-xl hover:bg-gray-50"
              >
                <Printer size={18} />
                Print QR
              </button>

              <button
                onClick={handleFreeTable}
                className="w-full flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition"
              >
                <Trash2 size={18} />
                Free Table
              </button>

              <button
                onClick={handleDeleteTable}
                className="w-full flex items-center justify-center gap-3 bg-red-700 hover:bg-red-800 text-white py-3 rounded-xl font-semibold transition"
              >
                <AlertTriangle size={18} />
                Delete Table
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}