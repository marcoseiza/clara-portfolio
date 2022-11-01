import type { GetStaticProps, NextPage } from "next";
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
import { useLoading, useTags } from "../store";
import MaybeImage from "../components/MaybeImage";
import useElementSize from "../helpers/hooks/UseElementSize";
import MouseHoverScaleAnimation from "../components/MouseHoverScaleAnimation";
import { PropsWithPage } from "./_app";
import withError from "../helpers/withError";
import { CaretDown } from "phosphor-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useSetTimeout } from "../helpers/hooks/UseSetTimeout";
import BackToTop from "../components/BackToTop";

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

  const [ref, size] = useElementSize<HTMLDivElement>();

  const { scrollYProgress } = useScroll();

  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.1, 1],
    [1.0, 0.94, 0.94]
  );

  const [showScroll, setShowScroll] = useState<boolean>(false);

  useSetTimeout(() => setShowScroll(true), 2000, [setShowScroll]);
  scrollYProgress.onChange(
    () => scrollYProgress.get() != 0 && setShowScroll(false)
  );

  const stopLoading = useLoading((s) => s.stopLoading);

  return (
    <>
      <motion.div style={{ scale: imageScale }} className="relative">
        <MouseHoverScaleAnimation
          size={size}
          scale={1.03}
          translate={0.01}
          noScaleOnHover
        >
          <div
            ref={ref}
            className="relative h-[100vh] next-image-container-height"
          >
            <MaybeImage
              src={pageInfo?.image}
              alt="Banner Image"
              className="next-image w-full mx-auto !object-cover"
              layout="fill"
              onLoadingComplete={() => stopLoading()}
              quality={100}
              priority
            />
          </div>
        </MouseHoverScaleAnimation>
        <AnimatePresence>
          {showScroll && (
            <motion.div
              className="absolute z-50 bottom-10 right-[50%] -translate-x-[50%] flex flex-col gap-1 items-center"
              initial={{ y: 100, opacity: 0.1 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 0, opacity: 0 }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
            >
              Scroll
              <CaretDown size={24} weight="bold" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <div className="md:container px-5 mx-auto">
        <div
          ref={scrollAnchor}
          id="gallery"
          className={`pt-[var(--headerHeight)] pb-20 min-h-screen ${
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
      </div>
      <AnimatePresence>{touched && <BackToTop />}</AnimatePresence>
    </>
  );
};

export const getStaticProps: GetStaticProps<
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

const HomeWithError = withError(Home);
(HomeWithError as any).noContainer = true;
(HomeWithError as any).showLoading = true;

export default HomeWithError;
