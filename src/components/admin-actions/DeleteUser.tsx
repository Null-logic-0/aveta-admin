import Button from "../UI/Button";
import Modal from "../UI/modal/Modal";

import type { RootState } from "../../store";
import { DeleteFilled } from "@ant-design/icons";
import { close, open } from "../../store/UI-slice";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteUser } from "../../hooks/useDeleteUser";

function DeleteUser({ id }: { id: number }) {
  const { mutate, isPending } = useDeleteUser({ id });
  const active = useSelector((state: RootState) => state.ui.active);
  const dispatch = useDispatch();

  const openModalHandler = () => {
    dispatch(open(id));
  };
  const closeModalHandler = () => {
    dispatch(close());
  };
  return (
    <>
      <button onClick={openModalHandler} className="cursor-pointer">
        <DeleteFilled className=" text-xl" />
      </button>
      {active === id && (
        <Modal onClose={closeModalHandler}>
          <p className="text-lg font-semibold mb-6 text-center text-white">
            Are you sure you want to delete user with ID:{id}?
          </p>
          <div className="flex justify-center gap-2 items-center">
            <Button
              isDisabled={isPending}
              buttonType="outline"
              onClick={closeModalHandler}
              className="text-white"
              type="button"
            >
              Cancel
            </Button>
            <Button
              className="text-white"
              onClick={() => mutate()}
              isDisabled={isPending}
              isPending={isPending}
            >
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default DeleteUser;
