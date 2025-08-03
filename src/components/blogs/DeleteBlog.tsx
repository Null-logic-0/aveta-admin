import Button from "../UI/Button";
import Modal from "../UI/modal/Modal";
import type { RootState } from "../../store";
import { close } from "../../store/UI-slice";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteBlog } from "../../hooks/useDeleteBlog";

function DeleteBlog({ blogId }: { blogId: number }) {
  const { mutate, isPending } = useDeleteBlog({ id: blogId });
  const showModal = useSelector((state: RootState) => state.ui.active);
  const dispatch = useDispatch();

  const closeModalHandler = () => dispatch(close());
  return (
    <>
      {showModal === blogId && (
        <Modal onClose={closeModalHandler}>
          <p className="text-sm font-semibold mb-6 text-center text-white">
            Are you sure you want to delete this blog?
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

export default DeleteBlog;
