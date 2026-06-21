import { Star } from "lucide-react";
import { useState } from "react";
import { useDebounce } from "use-debounce";

import SearchBar from "../../components/admin/SearchBar";
import RateModal from "../../components/user/RateModal";

import LoadingPage from "../common/LoadingPage";
import ErrorPage from "../common/ErrorPage";
import { useStores } from "../../hooks/user/useStores ";

function UserStores() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [debouncedSearch] = useDebounce(search, 500);

  const [selectedStore, setSelectedStore] = useState<{
    id: string;
    userRating: number | null;
  } | null>(null);

  const { data, isLoading, isError, refetch } = useStores(debouncedSearch);

  const handleOpen = (id: string, rating: number | null) => {
    setSelectedStore({
      id,
      userRating: rating,
    });

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStore(null);
  };

  if (isLoading) {
    return <LoadingPage message="Loading stores..." />;
  }

  if (isError) {
    return <ErrorPage message="Failed to load stores" refetch={refetch} />;
  }

  return (
    <div className="space-y-6 flex-1">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Browse Stores</h1>

          <p className="mt-1 text-gray-500">
            Discover stores and rate your experience.
          </p>
        </div>

        <div className="w-full md:w-96">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search store, email or owner..."
          />
        </div>
      </div>

      {/* Store List */}
      <div className="grid gap-6">
        {data?.data?.length === 0 ? (
          <div className="rounded-2xl border bg-white p-12 text-center text-gray-500">
            No stores found
          </div>
        ) : (
          data?.data?.map((store) => (
            <div
              key={store.id}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              {/* Store Info */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {store.name}
                </h2>

                <p className="mt-2 text-gray-500">{store.address}</p>
              </div>

              {/* Overall Rating */}
              <div className="mt-6">
                <p className="mb-2 text-sm font-medium text-gray-500">
                  Overall Rating
                </p>

                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={20}
                        className={
                          star <= Math.round(Number(store.averageRating))
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>

                  <span className="text-lg font-semibold">
                    {store.averageRating}
                  </span>
                </div>
              </div>

              {/* User Rating */}
              <div className="mt-6">
                <p className="mb-2 text-sm font-medium text-gray-500">
                  Your Rating
                </p>

                {store.userRating !== null ? (
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={20}
                          className={
                            star <= (store.userRating ?? 0)
                              ? "fill-blue-500 text-blue-500"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>

                    <span className="font-medium text-blue-600">
                      {store.userRating}/5
                    </span>
                  </div>
                ) : (
                  <p className="text-gray-500">Not rated</p>
                )}
              </div>

              {/* Action */}
              <div className="mt-6">
                <button
                  onClick={() => handleOpen(store.id, store.userRating)}
                  className="rounded-lg cursor-pointer bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
                >
                  {store.userRating !== null
                    ? "Update Rating"
                    : "Rate This Store"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {selectedStore && (
        <RateModal
          isOpen={open}
          onClose={handleClose}
          storeId={selectedStore.id}
          currentRating={selectedStore.userRating}
        />
      )}
    </div>
  );
}

export default UserStores;
