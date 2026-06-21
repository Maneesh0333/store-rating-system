import { Store, Star, Users } from "lucide-react";
import { useDashboard } from "../../hooks/owner/useDashboard";
import LoadingPage from "../common/LoadingPage";
import ErrorPage from "../common/ErrorPage";

function OwnerDashboard() {
  const { data, isLoading, isError, refetch } = useDashboard();

  const stats = [
    {
      icon: Store,
      title: "Store",
      value: data?.data.storeName,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: Star,
      title: "Average Rating",
      value: data?.data.averageRating,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-500",
    },
    {
      icon: Users,
      title: "Total Ratings",
      value: data?.data.totalRatings,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
  ];

  if (isLoading) {
    return <LoadingPage message="Loading Dashboard..." />;
  }

  if (isError) {
    return <ErrorPage message="Failed to load Dashboard" refetch={refetch} />;
  }

  return (
    <div className="flex-1 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="mt-1 text-gray-500">
          Overview of your store performance.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="rounded-2xl border border-gray-300 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className={`rounded-xl p-3 ${item.iconBg}`}>
                  <Icon className={item.iconColor} />
                </div>

                <div>
                  <p className="font-bold text-sm text-gray-500">
                    {item.title}
                  </p>

                  <h3 className="text-xl font-semibold">{item.value}</h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OwnerDashboard;
