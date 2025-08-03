import { Image } from "antd";
import ImageCardHeader from "./ImageCardHeader";
import SpinnerMini from "../UI/spinner-mini/SpinnerMini";
import defaultImage from "../../assets/default-image.jpg";
import { useDeleteEntityImage } from "../../hooks/useDeleteEntityImage";

type ImageProps = {
  image: string;
  id: number;
  tag: string;
};

function ImageCard({ image, id, tag }: ImageProps) {
  const { mutate, isPending } = useDeleteEntityImage({ id });

  return (
    <div className="relative  flex justify-center items-center max-w-[363px]  h-[363px]  w-full">
      <ImageCardHeader imageId={id} tag={tag} onDelete={() => mutate()} />
      <Image
        loading="lazy"
        width={363}
        height={363}
        src={image || defaultImage}
        alt={`image-${id}`}
        className="w-full object-cover rounded-xl"
      />
      {isPending && (
        <div className="absolute bg-black/50 w-full h-full flex items-center justify-center">
          <SpinnerMini />
        </div>
      )}
    </div>
  );
}

export default ImageCard;
