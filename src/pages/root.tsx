import { Outlet } from "react-router";
import NavMenu from "../components/nav-menu/NavMenu";

function RootLayout() {
  return (
    <>
      <NavMenu />
      <main className="flex justify-center items-center px-6 py-4 w-full mx-auto max-w-[1200px]">
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
