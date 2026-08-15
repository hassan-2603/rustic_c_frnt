import { Pencil, Trash2 } from "lucide-react";

type Props = {
  waiters: any[];
  onEdit: (waiter: any) => void;
  onDelete: (waiter: any) => void;
};

export default function WaiterTable({
  waiters,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-50">

          <tr>

            <th className="text-left p-5 font-semibold">
              Name
            </th>

            <th className="text-left p-5 font-semibold">
              PIN
            </th>

            <th className="text-left p-5 font-semibold">
              Status
            </th>

            <th className="text-left p-5 font-semibold">
              Online
            </th>

            <th className="text-right p-5 font-semibold">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {waiters.map((waiter) => (

            <tr
              key={waiter.id}
              className="border-t hover:bg-gray-50 transition"
            >

              <td className="p-5 font-medium">
                {waiter.name}
              </td>

              <td className="p-5">
                {waiter.pin}
              </td>

              <td className="p-5">

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    waiter.active
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {waiter.active
                    ? "Active"
                    : "Inactive"}
                </span>

              </td>

              <td className="p-5">

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    waiter.online
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {waiter.online
                    ? "Online"
                    : "Offline"}
                </span>

              </td>

              <td className="p-5">

                <div className="flex justify-end gap-3">

                  <button
                    onClick={() => onEdit(waiter)}
                    className="p-2 rounded-lg hover:bg-blue-50"
                  >
                    <Pencil
                      size={18}
                      className="text-blue-600"
                    />
                  </button>

                  <button
                    onClick={() => onDelete(waiter)}
                    className="p-2 rounded-lg hover:bg-red-50"
                  >
                    <Trash2
                      size={18}
                      className="text-red-600"
                    />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}