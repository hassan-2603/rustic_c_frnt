import { Search } from "lucide-react";

type Props = {
  search: string;
  setSearch: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
};

const statuses = [
  "All",
  "available",
  "busy",
  "break",
];

export default function WaiterFilters({
  search,
  setSearch,
  status,
  setStatus,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-5">

      <div className="flex flex-col lg:flex-row gap-5">

        <div className="relative flex-1">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search waiter..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-olive/30"
          />

        </div>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-olive/30"
        >
          {statuses.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item === "All"
                ? "All Status"
                : item}
            </option>
          ))}
        </select>

      </div>

    </div>
  );
}