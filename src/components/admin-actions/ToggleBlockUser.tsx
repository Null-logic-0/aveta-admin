import { Button } from "antd";
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
    <Button
      disabled={isPending}
      onClick={() => {
        mutate();
        toast.success(
          `User ${!isBlocked ? "blocked" : "Unblocked"} successfully!`
        );
      }}
      type="text"
    >
      {isBlocked ? (
        <LockFilled className="text-xl" />
      ) : (
        <UnlockFilled className="text-xl" />
      )}
    </Button>
  );
}

export default ToggleBlockUser;
