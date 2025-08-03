import { useDispatch } from "react-redux";
import { open } from "../../store/UI-slice";

import Button from "../UI/Button";
import Heading from "../UI/Heading";
import { FiPlus } from "react-icons/fi";

function MediaHeader() {
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between items-center">
      <Heading isTitle title="Image Management" />
      <Button
        buttonType="outline"
        className="w-[134px]"
        onClick={() => dispatch(open("upload-image"))}
      >
        <FiPlus />
        Add Image
      </Button>
    </div>
  );
}

export default MediaHeader;
