import { useDispatch, useSelector } from "react-redux";
import DropDownMenu from "../UI/dropdown-menu/DropDownMenu";
import DropDownMenuItem from "../UI/dropdown-menu/DropDownMenuItem";

import { BsThreeDots } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import type { RootState } from "../../store";
import { close, open } from "../../store/UI-slice";

type ImageCardHeaderProps = {
  tag: string;
  imageId: number;
  onDelete: () => void;
};

function ImageCardHeader({ tag, imageId, onDelete }: ImageCardHeaderProps) {
  const dispatch = useDispatch();
  const active = useSelector((state: RootState) => state.ui.active);

  const closeHandler = () => dispatch(close());

  const openHandler = () => {
    if (active === imageId) {
      closeHandler();
    } else {
      dispatch(open(imageId));
    }
  };

  return (
    <div className="flex justify-between items-center w-full z-10 top-2 left-2  absolute ">
      <p className="rounded-2xl  text-xs font-semibold bg-[#8a38f5] opacity-70  py-[2px] px-[10px]">
        {tag}
      </p>
      <>
        <button
          type="button"
          onClick={openHandler}
          className="p-2 mr-4 cursor-pointer text-black hover:bg-white/30 transition-all transform text-lg rounded-lg bg-white/20 backdrop-blur-md shadow-md"
        >
          <BsThreeDots />
        </button>
        {active === imageId && (
          <DropDownMenu className="w-30 right-4 top-10 z-50">
            <DropDownMenuItem
              operation={onDelete}
              onClose={closeHandler}
              className="text-red-700 hover:text-red-900"
            >
              Delete <MdDelete />
            </DropDownMenuItem>
          </DropDownMenu>
        )}
      </>
    </div>
  );
}

export default ImageCardHeader;
