import { EntityImageType } from "../enums/entity-images.enum";

export const imageTags = Object.entries(EntityImageType).map(
  ([, value], index) => ({
    id: (index + 1).toString(),
    title: value,
  })
);
