import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  return (
    <>
      <Header />
      <main className="container max-w-screen-xl mx-auto min-h-[calc(100svh_-_4rem)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
