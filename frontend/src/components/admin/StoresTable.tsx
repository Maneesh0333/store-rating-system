import { Star } from "lucide-react";
import LoadingPage from "../../Pages/common/LoadingPage";
import type { Store } from "../../types/admin.types";

type Props = {
  stores?: Store[];
  isLoading: boolean;
};

const StoresTable = ({ stores, isLoading }: Props) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-300 bg-white shadow-sm">
      <table className="w-full min-w-[700px] min-h-32">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-4 text-left">Store Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Address</th>
            <th className="p-4 text-left">Owner</th>
            <th className="p-4 text-left">Rating</th>
          </tr>
        </thead>

        <tbody className="relative">
          {isLoading ? (
            <div className="absolute top-0 left-0 inset-0 bg-black/10 flex items-center justify-center">
              <LoadingPage className="h-5! w-5!" />
            </div>
          ) : stores?.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-10 text-center text-gray-500">
                No stores found
              </td>
            </tr>
          ) : (
            stores?.map((store) => (
              <tr
                key={store.id}
                className="border-t border-gray-300 hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium text-gray-800">{store.name}</td>

                <td className="p-4 text-gray-600">{store.email}</td>

                <td className="p-4 text-gray-600 max-w-xs truncate">
                  {store.address}
                </td>

                <td className="p-4">
                  <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                    {store.owner.name}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex items-center gap-1">
                    <Star
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />

                    <span className="font-medium">
                      {store?.averageRating?.toFixed(1)}
                    </span>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StoresTable;
