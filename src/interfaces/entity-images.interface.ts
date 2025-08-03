import type { EntityImageType } from "../enums/entity-images.enum";

export interface EntityImageInterface {
  image: File | string;
  type:
    | EntityImageType
    | (File & EntityImageType.AVATAR)
    | (File & EntityImageType.THEME);
}

export interface EntityImageDataInterface {
  id: number;
  image: string;
  type: EntityImageType;
}

export interface EntityImageFormErrors {
  image: string;
  type: string;
}
