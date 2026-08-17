import { Pencil, Trash2 } from "lucide-react";
import { getLocalizedField } from "../../types";

type Props = {
  categories: any[];
  onEdit: (category: any) => void;
  onDelete: (category: any) => void;
};

export default function CategoryTable({
  categories,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-50">

          <tr>

            <th className="text-left p-5 font-semibold">
              Category
            </th>

            <th className="text-left p-5 font-semibold">
              Status
            </th>

            <th className="text-right p-5 font-semibold">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {categories.map((category) => (

            <tr
              key={category.id}
              className="border-t hover:bg-gray-50 transition"
            >

              <td className="p-5 font-medium">
                {getLocalizedField(category.name, "English")}
              </td>

              <td className="p-5">

                <label className="inline-flex items-center cursor-pointer">

  <input
    type="checkbox"
    checked={category.isActive}
    onChange={() => onEdit(category)}
    className="sr-only"
  />

  <div
    className={`w-11 h-6 rounded-full transition ${
      category.isActive
        ? "bg-green-500"
        : "bg-gray-300"
    }`}
  >
    <div
      className={`w-5 h-5 bg-white rounded-full mt-0.5 transition ${
        category.isActive
          ? "ml-5"
          : "ml-0.5"
      }`}
    />
  </div>

</label>

              </td>

              <td className="p-5">

                <div className="flex justify-end gap-3">

                  <button
                    onClick={() => onEdit(category)}
                    className="p-2 rounded-lg hover:bg-blue-50"
                  >
                    <Pencil
                      size={18}
                      className="text-blue-600"
                    />
                  </button>

                  <button
                    onClick={() => onDelete(category)}
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