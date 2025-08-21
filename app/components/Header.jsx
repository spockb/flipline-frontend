import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth-context";

export default function Header() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
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

  const isLoading = user === undefined;
  const isAuthed = !!user;
  const isMember = user?.role === "MEMBER";
  const isAdmin = user?.role === "ADMIN";

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
          {(isMember || isAdmin) && (
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
          )}

          {/* Public Links */}
          <li>
            <NavLink to="/about" className={className}>
              About
            </NavLink>
          </li>

          {/* Admin Links */}
          {isAdmin && (
            <>
              <li className="px-0 mr-2 btn btn-primary btn-sm">
                <NavLink to="/admin/properties/new">Add Property</NavLink>
              </li>
            </>
          )}

          {/* Auth buttons */}
          {isLoading ? null : !isAuthed ? (
            <>
              <li className="px-0 mr-2 btn btn-primary btn-sm">
                <Link to="/login">Log in</Link>
              </li>
              <li className="px-0 btn btn-soft btn-sm">
                <Link to="/signup">Sign up</Link>
              </li>
            </>
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
