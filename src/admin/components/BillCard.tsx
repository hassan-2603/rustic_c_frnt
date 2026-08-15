import {
  ArrowRight,
  Receipt,
} from "lucide-react";

import BillStatusBadge from "./BillStatusBadge";

type Props = {
  bill: any;
  onView: () => void;
};

export default function BillCard({
  bill,
  onView,
}: Props) {

  return (
    <div className="bg-white rounded-2xl border shadow-sm hover:shadow-lg transition">

      <div className="p-6">

        <div className="flex justify-between">

          <div>

            <h2 className="text-xl font-bold">
              {bill.orderNumber}
            </h2>

            <p className="text-gray-500 mt-1">
              {bill.tableLabel || bill.tableReference || `Table ${bill.tableNumber || "--"}`}
            </p>

          </div>

          <BillStatusBadge
            paymentStatus={bill.paymentStatus}
          />

        </div>

        <div className="mt-8 flex justify-between">

          <div className="flex gap-2 items-center">

            <Receipt
              size={18}
              className="text-olive"
            />

            Total

          </div>

          <span className="font-bold text-lg">
            ₹{bill.total}
          </span>

        </div>

        <button
          onClick={onView}
          className="mt-8 w-full bg-olive hover:bg-olive/90 text-white rounded-xl py-3 flex justify-center gap-2 items-center font-semibold"
        >
          View Bill

          <ArrowRight size={18}/>
        </button>

      </div>

    </div>
  );
}