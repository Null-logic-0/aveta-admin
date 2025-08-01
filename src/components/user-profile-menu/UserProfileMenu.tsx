import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import RoundedImage from "../UI/RoundedImage";

import defaultProfile from "../../assets/default.jpg";
import UserProfileMenuList from "./UserProfileMenuList";

function UserProfileMenu() {
  const [openMenu, setOpenMenu] = useState(false);
  const { data } = useAuth();
  const user = data?.data.data;

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="flex flex-col items-center relative ">
      <div
        className="flex items-center justify-center cursor-pointer gap-2"
        onClick={() => setOpenMenu(!openMenu)}
      >
        <RoundedImage
          src={user?.profileImage || defaultProfile}
          alt="User profile image"
        />
        <p className="text-sm opacity-50 font-semibold">{user?.userName}</p>
      </div>
      <UserProfileMenuList
        openMenu={openMenu}
        userId={user?.id}
        onClose={() => setOpenMenu(false)}
      />
    </div>
  );
}

export default UserProfileMenu;
