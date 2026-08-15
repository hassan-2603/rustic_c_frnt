import { Receipt } from "lucide-react";

export default function EmptyBills() {
  return (
    <div className="bg-white rounded-2xl border py-20">

      <div className="flex flex-col items-center">

        <Receipt
          size={52}
          className="text-olive"
        />

        <h2 className="text-2xl font-bold mt-6">
          No Bills Found
        </h2>

      </div>

    </div>
  );
}