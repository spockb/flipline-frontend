import { NavLink, Link } from "react-router-dom";
import Button from "./Button";

const links = [
  { link: "/properties", label: "Properties" },
  { link: "/favorites", label: "Favorites" },
  { link: "/about", label: "About" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 shadow-sm">
      <Link to="/" className="text-3xl font-bold tracking-tight text-gray-900">
        <span className="text-primary-500">Flip</span>Line
      </Link>
      <nav className="flex items-center justify-center gap-6 text-sm font-medium text-gray-600">
        {links.map(({ link, label }, i) => (
          <NavLink
            key={i}
            to={link}
            className={({ isActive }) =>
              isActive
                ? "text-primary-500 border-b-2 border-primary-500"
                : "hover:text-primary-500 transition"
            }
          >
            {label}
          </NavLink>
        ))}
        {/* <NavLink to="/login">
          <Button size="sm">Log in</Button>
        </NavLink>
        <NavLink to="/signup">
          <Button size="sm" variant="outline">
            Sign-up
          </Button>
        </NavLink> */}
      </nav>
    </header>
  );
}
