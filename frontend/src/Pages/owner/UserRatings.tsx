import { Star } from "lucide-react";
import { useRatings } from "../../hooks/owner/useRatings";
import LoadingPage from "../common/LoadingPage";
import ErrorPage from "../common/ErrorPage";


function UserRatings() {
  const { data: ratings, isLoading, isError, refetch } = useRatings();

  if (isLoading) {
    return <LoadingPage message="Loading store ratings..." />;
  }

  if (isError) {
    return <ErrorPage message="Failed to load store ratings" refetch={refetch} />;
  }

  return (
    <div className="flex-1 flex flex-col space-y-6 min-w-0">
      <div>
        <h1 className="text-3xl font-bold">User Ratings</h1>

        <p className="mt-1 text-gray-500">View ratings submitted by users.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">User</th>

              <th className="p-4 text-left">Email</th>

              <th className="p-4 text-left">Rating</th>
            </tr>
          </thead>

          <tbody>
            {ratings?.data.map((item) => (
              <tr key={item.id} className="border-t border-gray-300 hover:bg-gray-50">
                <td className="p-4 font-medium">{item.user}</td>

                <td className="p-4 text-gray-500">{item.email}</td>

                <td className="p-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={18}
                        className={
                          star <= item.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}

                    <span className="ml-2 font-medium">{item.rating}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserRatings;
