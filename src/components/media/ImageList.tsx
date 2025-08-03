import AppResult from "../UI/Result";
import ImageCard from "./ImageCard";
import Spinner from "../UI/spinner/Spinner";
import type { EntityImageDataInterface } from "../../interfaces/entity-images.interface";

type ImageListProps = {
  images: EntityImageDataInterface[];
  isPending?: boolean;
  isError?: boolean;
  error: string;
};

function ImageList({ images, isPending, isError, error }: ImageListProps) {
  if (isPending && !isError) {
    return (
      <div className="flex justify-center items-center bg-black/20 h-full fixed z-50 mx-auto top-0 left-0 w-full">
        <Spinner />
      </div>
    );
  }
  if (!isPending && isError) {
    return (
      <div className="flex justify-center items-center bg-black/30 h-full fixed z-50 mx-auto top-0 left-0 w-full">
        <AppResult status="error" title={error} />
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center w-full">
      {!isPending &&
        !isError &&
        images?.map((image) => (
          <ImageCard
            key={image.id}
            image={image.image}
            id={image.id}
            tag={image.type}
          />
        ))}
    </ul>
  );
}

export default ImageList;
