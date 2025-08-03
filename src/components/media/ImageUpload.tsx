import { EntityImageType } from "../../enums/entity-images.enum";
import { useUploadEntityImage } from "../../hooks/useUploadEntityImage";
import type { RootState } from "../../store";
import { close } from "../../store/UI-slice";
import DragAndDropUpload from "../UI/DragAndDropUpload";
import { IoImageOutline } from "react-icons/io5";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import SpinnerMini from "../UI/spinner-mini/SpinnerMini";

function ImageUpload() {
  const { mutate, isPending } = useUploadEntityImage();
  const active = useSelector((state: RootState) => state.ui.active);
  const dispatch = useDispatch();

  const uploadHandler = (
    file: File,
    type: EntityImageType.AVATAR | EntityImageType.THEME
  ) => {
    mutate({ image: file, type: type });
  };
  return (
    <>
      {active === "upload-image" && (
        <div className="flex transform transition-all flex-col gap-4 bg-[#11141D] p-4 border  border-[#3B3A3F] rounded-xl w-full">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Upload New Image</h3>
            <button
              onClick={() => dispatch(close())}
              className="text-sm font-medium text-white/70 cursor-pointer hover:text-white"
            >
              Cancel
            </button>
          </div>
          {isPending ? (
            <div className="flex items-center gap-2 justify-center text-xl font-semibold text-white opacity-50">
              <span>Uploading</span>
              <SpinnerMini />
            </div>
          ) : (
            <div className="flex justify-center items-start w-full gap-4">
              <DragAndDropUpload
                isPending={isPending}
                icon={<IoImageOutline />}
                title="Upload Avatar"
                onUpload={(file) => uploadHandler(file, EntityImageType.AVATAR)}
              />
              <DragAndDropUpload
                isPending={isPending}
                icon={<IoCloudUploadOutline />}
                title="Upload Theme"
                onUpload={(file) => uploadHandler(file, EntityImageType.THEME)}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ImageUpload;
