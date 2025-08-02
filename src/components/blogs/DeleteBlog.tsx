import { useDispatch, useSelector } from "react-redux";
import Button from "../UI/Button";
import type { RootState } from "../../store";
import AppModal from "../UI/Modal";
import { close, open } from "../../store/UI-slice";
import { useDeleteBlog } from "../../hooks/useDeleteBlog";

function DeleteBlog({ blogId }: { blogId: number }) {
  const { mutate, isPending } = useDeleteBlog({ id: blogId });
  const showModal = useSelector((state: RootState) => state.ui.active);
  const dispatch = useDispatch();

  const closeModalHandler = () => dispatch(close());
  return (
    <>
      <div className="flex justify-end">
        <Button
          type="button"
          buttonType="outline"
          className="w-[30%]"
          onClick={() => dispatch(open(blogId))}
        >
          Delete
        </Button>
      </div>
      <AppModal
        title="Delete Account"
        onClose={closeModalHandler}
        isOpen={showModal === blogId}
        onOk={() => {
          mutate();
          closeModalHandler();
        }}
        loading={isPending}
      >
        <p className="text-sm font-semibold">
          Do you really want to delete blog with ID:{blogId}?
        </p>
      </AppModal>
    </>
  );
}

export default DeleteBlog;
