import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import RoleRedirect from "./components/auth/RoleRedirect";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./Pages/admin/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Users from "./Pages/admin/Users";
import Stores from "./Pages/admin/Stores";
import Profile from "./Pages/user/Profile";
import OwnerProfile from "./Pages/owner/OwnerProfile";
import UserStores from "./Pages/user/UserStores";
import UserLayout from "./layouts/UserLayout";
import NotFound from "./Pages/common/NotFound";
import UserRatings from "./Pages/owner/UserRatings";
import OwnerDashboard from "./Pages/owner/OwnerDashboard";
import OwnerLayout from "../src/layouts/OwnerLayout";
import { ToggleProvider } from "./context/ToggleContext";

const queryClient = new QueryClient();

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RoleRedirect />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={"ADMIN"}>
        <AdminLayout />
      </ProtectedRoute>
    ),

    children: [
      {
        index: true,
        element: <Dashboard />,
      },

      {
        path: "users",
        element: <Users />,
      },

      {
        path: "stores",
        element: <Stores />,
      },
    ],
  },

  {
    path: "/user",
    element: (
      <ProtectedRoute allowedRoles={["USER"]}>
        <UserLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <UserStores />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },

  {
    path: "/store",
    element: (
      <ProtectedRoute allowedRoles={["STORE_OWNER"]}>
        <OwnerLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <OwnerDashboard />,
      },
      {
        path: "ratings",
        element: <UserRatings />,
      },
      {
        path: "profile",
        element: <OwnerProfile />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToggleProvider>
          <RouterProvider router={router} />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
            }}
          />
        </ToggleProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
