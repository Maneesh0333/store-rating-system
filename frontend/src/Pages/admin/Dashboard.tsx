import { Users, Store, Star } from "lucide-react";
import { useDashboard } from "../../hooks/admin/useDashboard";
import ErrorPage from "../common/ErrorPage";
import LoadingPage from "../common/LoadingPage";

const Dashboard = () => {
  const { data, isLoading, isError, refetch } = useDashboard();

  if (isLoading) {
    return <LoadingPage message="Loading dashboard..." />;
  }

  if (isError) {
    return (
      <ErrorPage message="Failed to load dashboard data" refetch={refetch} />
    );
  }

  const stats = [
    {
      title: "Total Users",
      value: data?.data?.totalUsers,
      icon: Users,
    },
    {
      title: "Total Stores",
      value: data?.data?.totalStores,
      icon: Store,
    },
    {
      title: "Total Ratings",
      value: data?.data?.totalRatings,
      icon: Star,
    },
  ];

  return (
    <div className="flex-1 flex flex-col">
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-gray-300 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>

                  <h2 className="mt-2 text-3xl font-bold">{stat.value}</h2>
                </div>

                <div className="rounded-lg bg-blue-100 p-3">
                  <Icon className="text-blue-600" size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
