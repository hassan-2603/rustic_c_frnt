import {
  ArrowRight,
  Star,
  TableProperties,
} from "lucide-react";

import WaiterStatusBadge from "./WaiterStatusBadge";

type Props = {
  waiter: any;
  onView: () => void;
};

export default function WaiterCard({
  waiter,
  onView,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">

      <div className="p-6">

        <div className="flex justify-between">

          <div>

            <h2 className="text-xl font-bold">
              {waiter.name}
            </h2>

            <p className="text-gray-500 mt-1">
              {waiter.shift} Shift
            </p>

          </div>

          <WaiterStatusBadge
            status={waiter.status}
          />

        </div>

        <div className="mt-8 space-y-4">

          <div className="flex justify-between">

            <div className="flex gap-2 items-center">

              <TableProperties
                size={18}
                className="text-olive"
              />

              Tables

            </div>

            <span>
              {waiter.assignedTables?.length || 0}
            </span>

          </div>

          <div className="flex justify-between">

            <div className="flex gap-2 items-center">

              <Star
                size={18}
                className="text-yellow-500"
              />

              Rating

            </div>

            <span>
              {waiter.rating || "-"}
            </span>

          </div>

        </div>

        <button
          onClick={onView}
          className="mt-8 w-full bg-olive hover:bg-olive/90 text-white py-3 rounded-xl flex justify-center items-center gap-2 font-semibold transition"
        >
          View Details

          <ArrowRight size={18} />
        </button>

      </div>

    </div>
  );
}