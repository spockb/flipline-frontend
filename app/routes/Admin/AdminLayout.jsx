import { Link, Outlet } from "react-router-dom";

const links = [
  { link: "properties/new", label: "Create Property" },
  { link: "properties/:id/edit", label: "Edit Property" },
];

const AdminLayout = () => {
  return (
    <>
      <div className="flex items-center justify-end gap-4 text-sm font-medium">
        {links.map(({ link, label }, i) => (
          <Link key={i} to={link}>
            <button className="btn btn-primary btn-sm">{label}</button>
          </Link>
        ))}
      </div>

      <Outlet />
    </>
  );
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {<Outlet />}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          {links.map(({ link, label }, i) => (
            <li>
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminLayout;
