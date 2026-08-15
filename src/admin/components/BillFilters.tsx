import { Search } from "lucide-react";

type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export default function BillFilters({
  search,
  setSearch,
}: Props) {

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-5">

      <div className="relative">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search bill..."
          className="w-full pl-11 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-olive/30"
        />

      </div>

    </div>
  );
}