import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../auth-context";

export default function Header() {
  const { logout, user } = useAuth();
  const className = ({ isActive }) =>
    isActive ? "text-primary underline underline-offset-8" : "";

  const logoutClick = async () => {
    try {
      await logout();
      navigate("/");
    } catch {
      console.error("Logout failed");
    }
  };

  return (
    <header className="z-50 shadow-sm navbar bg-base-100">
      <div className="flex-1">
        <Link
          to="/"
          className="flex-1 text-3xl font-bold tracking-tight btn btn-ghost"
        >
          <span className="text-primary">Flip</span>Line
        </Link>
      </div>

      <div className="flex-none">
        <ul className="px-1 menu menu-horizontal">
          {/* Member Links */}
          {user?.role === "MEMBER" ||
            (user?.role === "ADMIN" && (
              <>
                <li>
                  <NavLink to="/properties" className={className}>
                    Properties
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/favorites" className={className}>
                    Favorites
                  </NavLink>
                </li>
              </>
            ))}

          {/* Public Links */}
          <li>
            <NavLink to="/about" className={className}>
              About
            </NavLink>
          </li>

          {/* Admin Links */}
          {user?.role === "ADMIN" && (
            <>
              <li className="px-0 mr-2 btn btn-primary btn-sm">
                <NavLink to="/admin/properties/new">Add Property</NavLink>
              </li>
            </>
          )}

          {/* Login buttons */}
          {!user ? (
            <li className="px-0 mr-2 btn btn-primary btn-sm">
              <NavLink to="/login">Log in</NavLink>
            </li>
          ) : (
            <li className="px-0 btn btn-soft btn-sm">
              <button onClick={logoutClick}>Logout</button>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}
