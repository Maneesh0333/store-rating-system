import { Search } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}: SearchBarProps) {
  return (
    <div className="relative">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          h-11
          rounded-lg
          border
          border-gray-300
          bg-white
          pl-10
          pr-4
          focus:outline-blue-500
        "
      />
    </div>
  );
}

export default SearchBar;
