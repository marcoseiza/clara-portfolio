export interface ArtSeries {
  name?: ArtTag<ArtTagType.SERIES>;
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

export const getTagsFromArtSeriesList = (series: ArtSeries[]): AnyArtTag[] => {
  let tags: Set<AnyArtTag> = new Set();
  series.forEach((s) => {
    s.name && tags.add(s.name);
    s.art.forEach((a) => a.tags.forEach((t) => tags.add(t)));
  });
  return Array.from(tags);
};

const tagsAreEqual = (
  a: ArtTag<ArtTagType.PIECE>[],
  b: ArtTag<ArtTagType.PIECE>[]
) => {
  return a.length == b.length && a.every((v) => !!b.find((t) => t == v));
};

export const filterArtByTags = (
  series: ArtSeries[],
  tags: AnyArtTag[]
): ArtSeries[] => {
  if (tags.length == 0) {
    return series;
  }

  const seriesTags = tags.filter(
    (t) => t.type == ArtTagType.SERIES
  ) as ArtTag<ArtTagType.SERIES>[];
  const pieceTags = tags.filter(
    (t) => t.type == ArtTagType.PIECE
  ) as ArtTag<ArtTagType.PIECE>[];

  let allowedSeries: ArtSeries[] = [];

  if (seriesTags.length != 0) {
    seriesTags.forEach((st) => {
      let foundSeries = series.find((s) => s.name == st);
      if (foundSeries) allowedSeries.push({ ...foundSeries });
    });
  } else {
    allowedSeries.push(...series);
  }

  if (pieceTags.length != 0) {
    allowedSeries = allowedSeries.map((as) => ({
      ...as,
      art: as.art.filter((a) => tagsAreEqual(a.tags, pieceTags)),
    }));
  }

  return allowedSeries.sort((a, b) => a.order - b.order);
};
