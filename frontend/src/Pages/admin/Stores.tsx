import { Plus } from "lucide-react";
import { useState } from "react";
import { useDebounce } from "use-debounce";

import SearchBar from "../../components/admin/SearchBar";
import ErrorPage from "../common/ErrorPage";
import { useStores } from "../../hooks/admin/useStores";
import AddStoreModal from "../../components/admin/AddStoreModal";
import StoresTable from "../../components/admin/StoresTable";


const Stores = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading, isError, refetch } = useStores(debouncedSearch);

  if (isError) {
    return <ErrorPage message="Failed to load stores data" refetch={refetch} />;
  }

  return (
    <div className="flex-1 flex flex-col space-y-6 min-w-0">
      {/* Header */}
      <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Stores Management</h1>

          <p className="text-sm text-gray-500">Manage stores and ratings</p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Store
        </button>
      </section>

      {/* Search */}
      <section>
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search store, email or owner..."
        />
      </section>

      {/* Table */}
      <StoresTable stores={data?.data} isLoading={isLoading} />

      {/* Modal */}
      <AddStoreModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default Stores;
