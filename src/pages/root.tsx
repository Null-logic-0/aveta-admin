import { Outlet } from "react-router";
import NavMenu from "../components/nav-menu/NavMenu";

function RootLayout() {
  return (
    <>
      <NavMenu />
      <main className="flex justify-center items-center h-screen">
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
