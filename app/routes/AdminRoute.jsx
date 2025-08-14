import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth-context";

const AdminRoute = () => {
  const { user } = useAuth();

  if (user === undefined) return <div>Loading...</div>;

  if (!user || user.role === "MEMBER") return <Navigate to="/" />;

  if (user.role === "ADMIN") return <Outlet />;
};

export default AdminRoute;
