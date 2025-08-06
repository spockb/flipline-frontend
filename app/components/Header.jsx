import { NavLink, Link } from "react-router-dom";

const links = [
  { link: "/properties", label: "Properties" },
  { link: "/about", label: "About" },
];

export default function Header() {
  return (
    <header className="flex justify-between p-4 border-b">
      <Link to="/" className="text-2xl">
        InvestoPresto
      </Link>
      <nav className="flex gap-2">
        {links.map((link, i) => {
          return (
            <NavLink to={`${link.link}`} key={i}>
              {link.label}
            </NavLink>
          );
        })}
      </nav>
    </header>
  );
}
