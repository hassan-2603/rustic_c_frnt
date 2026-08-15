import { ClipboardList } from "lucide-react";

export default function EmptyOrders() {
  return (
    <div className="bg-white rounded-2xl border border-dashed border-gray-300 py-20">

      <div className="flex flex-col items-center">

        <div className="w-20 h-20 rounded-full bg-olive/10 flex items-center justify-center">

          <ClipboardList
            size={42}
            className="text-olive"
          />

        </div>

        <h2 className="mt-6 text-2xl font-bold text-gray-800">
          No Orders Yet
        </h2>

        <p className="mt-2 text-gray-500 text-center max-w-md">
          Orders placed by customers will automatically appear
          here in real time.
        </p>

      </div>

    </div>
  );
}