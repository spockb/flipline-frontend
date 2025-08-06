import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  return (
    <>
      <Header />
      <main className="container max-w-screen-xl px-4 py-8 mx-auto">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
