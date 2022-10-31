import client from "../.tina/__generated__/client";
import { Index as PageInfo, Series } from "../.tina/__generated__/types";
import {
  AnyArtTag,
  ArtInfo,
  ArtSeries,
  ArtTag,
  ArtTagType,
  AVAILABLE,
  SOLD,
} from "./ArtGallery.types";

export const getSeries = async () => {
  const connection = await client.queries.seriesConnection();
  const edges = connection.data.seriesConnection.edges;
  const seriesUnsafe = edges?.map((v, i): ArtSeries | undefined => {
    if (!v?.node) return;
    const name = makeSeriesTag(v.node.name);
    return { name, id: v.node.id, order: i, art: [] };
  });
  const series =
    seriesUnsafe?.filter((v): v is ArtSeries => v != undefined) ?? [];
  return series;
};

export const fillSeriesWithArt = async (series: ArtSeries[]) => {
  const connection = await client.queries.artConnection();
  const edges = connection.data.artConnection.edges;

  edges?.forEach((a) => {
    if (a?.node == undefined) return;
    const tags = [a.node.sold ? SOLD : AVAILABLE];
    const info: ArtInfo = {
      src: a.node.src,
      tags,
      slug: a.node._sys.filename,
      title: a.node.title,
    };
    const ii = series.findIndex((s) => s.id == a.node?.series.id);
    if (ii == -1) return;
    series[ii].art.push(info);
  });
};

export const makeSeriesTag = (body: string): ArtTag<ArtTagType.SERIES> => {
  return {
    body,
    type: ArtTagType.SERIES,
  };
};

export const getSeriesDisplayInstructions = (
  pageInfo: PageInfo | undefined
): Series[] =>
  pageInfo?.series
    ?.map((v) => v?.series)
    .filter((v): v is Series => v != undefined) ?? [];

export const parseSeriesDisplayInstructions = (
  seriesDisplayInstructions: Series[],
  series: ArtSeries[]
): ArtSeries[] =>
  seriesDisplayInstructions
    .map((v, i) => {
      const found = series.find((s) => s.id == v.id);
      return found && { ...found, order: i };
    })
    .filter((v): v is ArtSeries => v != undefined);

export const getTagsFromArtSeriesList = (series: ArtSeries[]): AnyArtTag[] => {
  let tags: AnyArtTag[] = [];
  series.forEach((s) => {
    if (s.art.length > 0) {
      tags.push(s.name);
      s.art.forEach((a) => a.tags.forEach((t) => tags.push(t)));
    }
  });

  tags.push(SOLD);
  tags.push(AVAILABLE);

  const uniqueTags = tags.reduce((parsedTags, currTag) => {
    if (parsedTags.findIndex((t) => tagComparator(t, currTag)) == -1)
      parsedTags.push(currTag);
    return parsedTags;
  }, [] as AnyArtTag[]);

  return uniqueTags;
};

const tagComparator = (a: AnyArtTag, b: AnyArtTag) => {
  return a.body == b.body && a.type == b.type;
};

const tagsAreEqual = (
  a: ArtTag<ArtTagType.PIECE>[],
  b: ArtTag<ArtTagType.PIECE>[]
) => {
  return (
    a.length == b.length && a.every((v) => !!b.find((t) => tagComparator(t, v)))
  );
};

export const filterArtByTags = (
  series: ArtSeries[],
  tags: AnyArtTag[]
): ArtSeries[] => {
  if (tags.length == 0) {
    return series.sort((a, b) => a.order - b.order);
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

export const hasNoArt = (series: ArtSeries[]): boolean =>
  series.length == 0 || series.every((v) => v.art.length == 0);
