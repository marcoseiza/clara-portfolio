import type { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { useTina } from "tinacms/dist/edit-state";
import client from "../.tina/__generated__/client";
import {
  Index as PageInfo,
  IndexQuery,
  IndexQueryVariables,
} from "../.tina/__generated__/types";
import ArtGallerySeries from "../components/ArtGallerySeries";
import { ErrorProps, makeError } from "../helpers";
import { ArtSeries } from "../helpers/ArtGallery.types";
import {
  fillSeriesWithArt,
  filterArtByTags,
  getSeries,
  getSeriesDisplayInstructions,
  getTagsFromArtSeriesList,
  hasNoArt,
  parseSeriesDisplayInstructions,
} from "../helpers/ArtGalleryHelpers";
import { useTouchTop } from "../helpers/hooks/UseScroll";
import { useTags } from "../store";
import MaybeImage from "../components/MaybeImage";
import useElementSize from "../helpers/hooks/UseElementSize";
import MouseHoverScaleAnimation from "../components/MouseHoverScaleAnimation";
import { PropsWithPage } from "./_app";
import withError from "../helpers/withError";
import Link from "next/link";
import { CaretUp } from "phosphor-react";
import { motion, AnimatePresence } from "framer-motion";
import { popUp } from "../helpers/PopUp";

interface ServerSideProps {
  series: ArtSeries[];
  data: IndexQuery;
  variables: IndexQueryVariables;
  query: string;
}

const Home: NextPage<PropsWithPage<ServerSideProps>> = ({
  data,
  variables,
  query,
  setIsGallery,
  ...props
}: PropsWithPage<ServerSideProps>) => {
  let [series, setSeries] = useState<ArtSeries[]>(props.series);

  const page = useTina({ query, variables, data });
  const pageInfo = page.data.index as PageInfo | undefined;

  useEffect(() => {
    const instructions = getSeriesDisplayInstructions(pageInfo);
    setSeries(parseSeriesDisplayInstructions(instructions, props.series));
  }, [pageInfo, props.series]);

  useEffect(() => {
    useTags.setState({ tags: getTagsFromArtSeriesList(series) });
  }, [series]);

  const { filteredArt, noArt } = useTags((state) => {
    let filteredArt = filterArtByTags(series, state.chosenTags);
    return { filteredArt, noArt: hasNoArt(filteredArt) };
  });
  const [scrollAnchor, touched] = useTouchTop(true);
  useEffect(() => setIsGallery(touched), [touched, setIsGallery]);

  const [ref, size] = useElementSize<HTMLImageElement>();

  return (
    <>
      <MouseHoverScaleAnimation size={size}>
        <MaybeImage
          src={pageInfo?.image}
          className="w-full h-[calc(100vh-var(--headerHeight)-1.5em)] mx-auto object-cover"
          imageRef={ref}
        />
      </MouseHoverScaleAnimation>
      <div
        ref={scrollAnchor}
        id="gallery"
        className={`pt-4 pb-20 min-h-screen ${
          noArt && "flex items-center justify-center"
        }`}
      >
        {noArt && (
          <h1 className="text-xl max-w-xs text-center">
            There are no pieces in the gallery with those tags.
          </h1>
        )}
        {filteredArt.map((series, i) =>
          series.art.length > 0 ? (
            <ArtGallerySeries key={i} series={series} order={i} />
          ) : null
        )}
      </div>
      <AnimatePresence>
        {touched && (
          <Link href="/">
            <motion.div
              className="fixed bottom-10 right-10 py-2 px-4 bg-black rounded-full flex items-center gap-1 cursor-pointer"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CaretUp
                size={24}
                weight="bold"
                {...{ className: "text-white" }}
              />
              <span className="uppercase text-white font-bold">top</span>
            </motion.div>
          </Link>
        )}
      </AnimatePresence>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  ServerSideProps | ErrorProps
> = async () => {
  const series = await getSeries();
  await fillSeriesWithArt(series);

  try {
    var page = await client.queries.index({ relativePath: `index.mdx` });
  } catch (e) {
    return { props: makeError(500, "Server error while loading content.") };
  }

  return { props: { series, ...page } };
};

export default withError(Home);
