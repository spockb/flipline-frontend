import { NavLink, Outlet } from "react-router-dom";

const links = [
  { link: "properties/new", label: "Create New Property" },
  { link: "properties/:id/edit", label: "Edit Existing Property" },
];

const AdminLayout = () => {
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
