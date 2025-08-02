import { Link } from "react-router";
import NavMenuItem from "./NavMenuItem";
import Logo from "../UI/Logo";
import UserProfileMenu from "../user-profile-menu/UserProfileMenu";

function NavMenu() {
  return (
    <header className="bg-[#11141D] z-50 fixed top-0 w-full">
      <nav className="flex justify-between items-center px-6 py-4">
        <Link to={"/"}>
          <Logo />
        </Link>
        <ul className="flex items-center justify-center gap-6">
          <NavMenuItem link="/">Users</NavMenuItem>
          <NavMenuItem link="/media">Media</NavMenuItem>
          <NavMenuItem link="/blogs">Blogs</NavMenuItem>
          <NavMenuItem link="/create-blog">Create Blog</NavMenuItem>
        </ul>
        <UserProfileMenu />
      </nav>
    </header>
  );
}

export default NavMenu;
