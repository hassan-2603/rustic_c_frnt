import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}: Props) {
  return (
    <div className="relative w-full max-w-sm">

      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        size={18}
      />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full
          rounded-xl
          border
          border-gray-300
          bg-white
          py-3
          pl-11
          pr-4
          outline-none
          transition
          focus:border-olive
          focus:ring-2
          focus:ring-olive/20
        "
      />

    </div>
  );
}