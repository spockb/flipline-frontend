import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../auth-context";

const PrivateRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (user === undefined) return <div>Loading…</div>;

  if (!user)
    return (
      <Navigate
        to="/login"
        state={{
          message: "You must log in first.",
          path: `${location.pathname}`,
        }}
      />
    );

  return <Outlet />;
};

export default PrivateRoute;
