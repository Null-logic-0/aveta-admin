import StatsItem from "../UI/StatsItem";
import type { EntityImageDataInterface } from "../../interfaces/entity-images.interface";
import { useFetchEntityImages } from "../../hooks/useFetchEntityImages";

function MediaStats() {
  const { data } = useFetchEntityImages({});
  const images: EntityImageDataInterface[] = data?.data?.data;

  const avatarsCount =
    images?.filter((img) => img.type === "avatar").length || 0;
  const themesCount = images?.filter((img) => img.type === "theme").length || 0;
  return (
    <ul className="flex justify-center items-center gap-6">
      <StatsItem title="Total Images" count={images?.length} tag="All" />
      <StatsItem title="Avatars" count={avatarsCount} tag="Avatar" />
      <StatsItem title="Themes" count={themesCount} tag="Theme" />
    </ul>
  );
}

export default MediaStats;
