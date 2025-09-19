import { Navigate, Outlet } from "react-router";
import { useAuth } from "./auth";

const PrivateRoute = ({ allowedRoles }) => {
  const { user, isAuthenticated, permissions } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.some((role) => role === user.role.name)) {
    return <Navigate to="/fobiden" replace />;
  }

  return <Outlet />;
};
export default PrivateRoute;
