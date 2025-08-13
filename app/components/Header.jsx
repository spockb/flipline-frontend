import { NavLink, Link } from "react-router-dom";

const links = [
  { link: "/properties", label: "Properties" },
  { link: "/favorites", label: "Favorites" },
  { link: "/about", label: "About" },
];

const adminLinks = [
  { link: "admin/properties/new", label: "Create Property" },
  // { link: "admin/properties/:id/edit", label: "Edit Property" },
];

export default function Header() {
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
          {links.map(({ link, label }, i) => (
            <li key={i}>
              <NavLink
                to={link}
                className={({ isActive }) =>
                  isActive ? "text-primary underline underline-offset-8" : ""
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
          <li className="px-0 mr-2 btn btn-primary btn-sm">
            <NavLink to="/login">Log in</NavLink>
          </li>
          <li className="px-0 btn btn-soft btn-sm">
            <NavLink to="/">Logout</NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}
