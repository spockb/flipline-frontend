import { NavLink, Link } from "react-router-dom";

const links = [
  { link: "/properties", label: "Properties" },
  { link: "/favorites", label: "Favorites" },
  { link: "/about", label: "About" },
];

const adminLinks = [
  { link: "admin/properties/new", label: "Create Property" },
  { link: "admin/properties/:id/edit", label: "Edit Property" },
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
          <li>
            <details>
              <summary>Admin</summary>
              <ul className="z-50 p-2 rounded-t-none bg-base-100">
                {adminLinks.map(({ link, label }, i) => {
                  return (
                    <li key={i}>
                      <Link to={link}>{label}</Link>
                    </li>
                  );
                })}
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </header>
  );
}

{
  /* <header className="shadow-sm navbar bg-base-100">
  <Link
    to="/"
    className="flex-1 text-3xl font-bold tracking-tight btn btn-ghost"
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
    <div className="flex-none">
      <ul className="menu menu-horizontal">
        <li>
          <details>
            <summary>Admin</summary>
            <ul className="p-2 rounded-t-none bg-base-100">
              <li>
                <Link to="/admin/properties/new">Add Property</Link>
              </li>
              <li>
                <Link to="/admin/${id}/edit">Edit Property</Link>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
  </nav>
</header>; */
}
