import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function RoleRedirect() {
  const { user } = useAuth();

  switch (user?.role) {
    case "ADMIN":
      return <Navigate to="/admin" replace />;
    case "USER":
      return <Navigate to="/user" replace />;

    case "STORE_OWNER":
      return <Navigate to="/store" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
}

export default RoleRedirect;
