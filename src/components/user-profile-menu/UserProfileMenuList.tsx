import clsx from "clsx";
import { CgLogOut } from "react-icons/cg";

import { useSignOut } from "../../hooks/useSignOut";
import DropDownMenu from "../UI/dropdown-menu/DropDownMenu";
import DropDownMenuItem from "../UI/dropdown-menu/DropDownMenuItem";

type UserProfileMenuListProps = {
  openMenu: boolean;
  userId?: number;
  onClose: () => void;
  isAdmin?: boolean;
  userName?: string;
  role?: string;
};
function UserProfileMenuList({ openMenu, onClose }: UserProfileMenuListProps) {
  const { mutate, isPending } = useSignOut();

  return (
    <DropDownMenu
      className={clsx(
        "top-10 w-[200px] -right-5",
        openMenu
          ? "max-h-50 opacity-100 scale-100"
          : "max-h-0 opacity-0 scale-95"
      )}
    >
      <DropDownMenuItem
        operation={() => mutate()}
        disabled={isPending}
        onClose={onClose}
      >
        Log out
        <CgLogOut className="text-lg" />
      </DropDownMenuItem>
    </DropDownMenu>
  );
}

export default UserProfileMenuList;
