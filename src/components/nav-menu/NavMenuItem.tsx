import { NavLink } from "react-router";

type NavMenuItemProps = {
  link: string;
  children: React.ReactNode;
};

function NavMenuItem({ link, children }: NavMenuItemProps) {
  return (
    <li>
      <NavLink to={link}>
        {({ isActive }) => (
          <span
            className={`text-sm font-semibold transition ${
              isActive ? "text-[#FF4DC3]" : "text-white hover:text-[#FF4DC3]"
            }`}
          >
            {children}
          </span>
        )}
      </NavLink>
    </li>
  );
}

export default NavMenuItem;
