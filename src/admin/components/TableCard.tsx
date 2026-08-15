import {
  ArrowRight,
  Receipt,
  Trash2,
  Unlock,
  UtensilsCrossed,
} from "lucide-react";

import TableStatusBadge from "./TableStatusBadge";
import { getTableDisplayName } from "../../utils/tableUtils";
import { deleteTable, freeTable } from "../services/tableService";

type Props = {
  table: any;
  onView: () => void;
};

export default function TableCard({
  table,
  onView,
}: Props) {
  async function handleFreeTable() {
    if (!confirm(`Free ${getTableDisplayName(table)}?`)) return;
    await freeTable(table.id);
  }

  async function handleDeleteTable() {
    if (!confirm(`Permanently delete ${getTableDisplayName(table)}? This table link will stop working for customers.`)) return;
    await deleteTable(table.id);
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      <div className="p-6">

        {/* Header */}

        <div className="flex justify-between items-start">

          <div>

            <h2 className="text-2xl font-bold text-gray-900">
              {getTableDisplayName(table)}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {table.areaLabel || "Restaurant Table"}
            </p>

          </div>

          <TableStatusBadge
            status={table.status}
          />

        </div>

        {/* Info */}

        <div className="mt-8 space-y-4">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <UtensilsCrossed
                size={18}
                className="text-olive"
              />

              <span className="text-gray-600">
                Occupied
              </span>

            </div>

            <span className="font-semibold">
              {table.occupied ? "Yes" : "No"}
            </span>

          </div>

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <Receipt
                size={18}
                className="text-olive"
              />

              <span className="text-gray-600">
                Current Order
              </span>

            </div>

            <span className="font-semibold">
              {table.currentOrderId
                ? table.currentOrderId.slice(0, 8)
                : "--"}
            </span>

          </div>

        </div>

        {/* Footer */}

        <div className="mt-8 space-y-3">

          <button
            onClick={onView}
            className="w-full flex items-center justify-center gap-2 bg-olive hover:bg-olive/90 text-white py-3 rounded-xl font-semibold transition"
          >
            View Details

            <ArrowRight size={18} />

          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleFreeTable}
              className="flex items-center justify-center gap-2 rounded-xl border border-orange-300 bg-orange-50 px-3 py-2.5 text-sm font-semibold text-orange-700 hover:bg-orange-100"
            >
              <Unlock size={16} />
              Free Table
            </button>

            <button
              onClick={handleDeleteTable}
              className="flex items-center justify-center gap-2 rounded-xl border border-red-300 bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-100"
            >
              <Trash2 size={16} />
              Delete Table
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}