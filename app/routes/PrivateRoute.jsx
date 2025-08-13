import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth-context";

const PrivateRoute = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) navigate("/login");

  return <Outlet />;
};

export default PrivateRoute;
