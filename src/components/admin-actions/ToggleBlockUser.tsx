import { LockFilled, UnlockFilled } from "@ant-design/icons";
import toast from "react-hot-toast";
import { useToggleBlockUser } from "../../hooks/useToggleBlockUser";

type ToggleBlockUserType = {
  id: number;
  isBlocked: boolean;
};

function ToggleBlockUser({ id, isBlocked }: ToggleBlockUserType) {
  const { mutate, isPending } = useToggleBlockUser({ id });
  return (
    <button
      disabled={isPending}
      onClick={() => {
        mutate();
        toast.success(
          `User ${!isBlocked ? "blocked" : "Unblocked"} successfully!`
        );
      }}
    >
      {isBlocked ? (
        <LockFilled className="text-xl" />
      ) : (
        <UnlockFilled className="text-xl" />
      )}
    </button>
  );
}

export default ToggleBlockUser;
