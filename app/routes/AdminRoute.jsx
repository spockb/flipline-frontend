import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth-context";

const PrivateRoute = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user || user.role === "MEMBER") navigate("/login");

  if (user.role === "ADMIN") return <Outlet />;
};
