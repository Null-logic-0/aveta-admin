import { twMerge } from "tailwind-merge";

type UserProfileMenuListProps = {
  children: React.ReactNode;
  className?: string;
};

function DropDownMenu({ className, children }: UserProfileMenuListProps) {
  return (
    <div
      className={twMerge(
        "overflow-hidden absolute z-10 transition-all duration-300 ease-in-out w-full",
        className
      )}
    >
      <ul className="bg-[#11141D]  border border-[#3B3A3F] w-full rounded-[6px]  p-2 flex flex-col gap-2">
        {children}
      </ul>
    </div>
  );
}

export default DropDownMenu;
