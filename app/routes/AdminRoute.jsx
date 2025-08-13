import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth-context";

const AdminRoute = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user || user.role === "MEMBER") navigate("/login");

  if (user.role === "ADMIN") return <Outlet />;
};

export default AdminRoute;
