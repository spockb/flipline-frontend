import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth-context";

const AdminRoute = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return null;

  if (!user || user.role === "MEMBER") navigate("/");

  if (user.role === "ADMIN") return <Outlet />;
};

export default AdminRoute;
