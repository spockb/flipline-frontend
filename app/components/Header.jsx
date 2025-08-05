import styles from "./Header.module.css";
import { NavLink, Link } from "react-router-dom";

const links = [
  { link: "/listings", label: "Listings" },
  { link: "/about", label: "About" },
];

export default function Header() {
  return (
    <header>
      <Link to="/">InvestoPresto</Link>
      <nav>
        {links.map((link) => {
          return <NavLink to={`${link.link}`}>{link.label}</NavLink>;
        })}
      </nav>
    </header>
  );
}
