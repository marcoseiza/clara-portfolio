export interface ArtSeries {
  name: ArtTag<ArtTagType.SERIES>;
  id: string;
  order: number;
  art: ArtInfo[];
}

export interface ArtInfo {
  src: string;
  tags: ArtTag<ArtTagType.PIECE>[];
  slug: string;
}

export enum ArtTagType {
  SERIES = 0,
  PIECE = 1,
}

export interface ArtTag<T extends ArtTagType> {
  body: string;
  type: T;
}

export type AnyArtTag = ArtTag<ArtTagType>;

export const SOLD: ArtTag<ArtTagType.PIECE> = {
  body: "sold",
  type: ArtTagType.PIECE,
};
export const AVAILABLE: ArtTag<ArtTagType.PIECE> = {
  body: "available",
  type: ArtTagType.PIECE,
};
