import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth-context";

const PrivateRoute = () => {
  const { user } = useAuth();

  if (user === undefined) return <div>Loading…</div>;

  if (!user) return <Navigate to="/login" />;

  return <Outlet />;
};

export default PrivateRoute;
