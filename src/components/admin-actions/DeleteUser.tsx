import { Button } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useDeleteUser } from "../../hooks/useDeleteUser";
import { close, open } from "../../store/UI-slice";
import AppModal from "../UI/Modal";

function DeleteUser({ id }: { id: number }) {
  const showModal = useSelector((state: RootState) => state.ui.active);
  const dispatch = useDispatch();
  const { mutate, isPending } = useDeleteUser({ id });

  const openModalHandler = () => {
    dispatch(open(id));
  };
  const closeModalHandler = () => {
    dispatch(close());
  };
  return (
    <>
      <Button onClick={openModalHandler} type="text">
        <DeleteFilled className=" text-xl" />
      </Button>
      <AppModal
        title="Delete Account"
        onClose={closeModalHandler}
        isOpen={showModal === id}
        onOk={() => {
          mutate();
          closeModalHandler();
        }}
        loading={isPending}
      >
        <p className="text-sm font-semibold">
          Do you really want to delete user with ID:{id}?
        </p>
      </AppModal>
    </>
  );
}

export default DeleteUser;
