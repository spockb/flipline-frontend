import { NavLink, Link } from "react-router-dom";

const links = [
  { link: "/properties", label: "Properties" },
  { link: "/favorites", label: "Favorites" },
  { link: "/about", label: "About" },
  { link: "/admin", label: "Admin" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 shadow bg-base-100">
      <Link
        to="/"
        className="text-3xl font-bold tracking-tight text-base-content"
      >
        <span className="text-primary">Flip</span>Line
      </Link>

      <nav className="flex items-center gap-4 text-sm font-medium">
        {links.map(({ link, label }, i) => (
          <NavLink
            key={i}
            to={link}
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-primary text-primary"
                : "text-base-content hover:text-primary transition"
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
