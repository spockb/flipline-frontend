import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth-context";

const PrivateRoute = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return null;

  if (!user) navigate("/login");

  return <Outlet />;
};

export default PrivateRoute;
