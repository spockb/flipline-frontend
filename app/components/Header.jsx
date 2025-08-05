import { NavLink, Link } from "react-router-dom";
export default function Header() {
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };
  return (
    <>
      <header>
        <Link to="/">InvestoPresto</Link>
        <nav>
          <NavLink
            to="/listings"
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Listings
          </NavLink>
          <NavLink
            to="/about"
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            About
          </NavLink>
        </nav>
      </header>
    </>
  );
}
