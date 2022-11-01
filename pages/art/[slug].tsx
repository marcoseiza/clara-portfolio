import { useTina } from "tinacms/dist/edit-state";
import client from "../../.tina/__generated__/client";
import {
  ArtQuery,
  Art as ArtInfo,
  ArtQueryVariables,
} from "../../.tina/__generated__/types";
import MaybeImage from "../../components/MaybeImage";
import MaybeBody from "../../components/MaybeBody";
import { ErrorProps, makeError, minCss } from "../../helpers";
import { GetStaticProps, GetStaticPaths } from "next/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { popLeft, popUp } from "../../helpers/PopUp";
import withError from "../../helpers/withError";
import { useCallback, useEffect, useRef, useState } from "react";
import Carousel, { getNext, getPrev } from "../../components/Carousel";
import AltImage from "../../components/AltImage";
import useElementSize from "../../helpers/hooks/UseElementSize";
import MouseHoverScaleAnimation from "../../components/MouseHoverScaleAnimation";
import { ArrowRight } from "phosphor-react";
import Spotlight from "../../components/Spotlight";
import Head from "next/head";

interface StaticProps {
  data: ArtQuery;
  variables: ArtQueryVariables;
  query: string;
}

const Art = ({ data, variables, query }: StaticProps) => {
  const page = useTina({ query, variables, data });
  const art = page.data?.art as ArtInfo;

  const [currentImg, setCurrentImg] = useState<number | undefined>(undefined);
  const [allImages, setAllImages] = useState<string[]>([]);

  const shiftCarousel = useCallback(
    (right: boolean) => {
      if (currentImg == undefined) return;
      if (right) setCurrentImg(getNext(currentImg, allImages.length));
      else setCurrentImg(getPrev(currentImg, allImages.length));
    },
    [setCurrentImg, currentImg, allImages]
  );

  useEffect(() => {
    if (!art) return;
    const images = [art.src];
    art.altImages?.forEach((img) => {
      if (img?.src) images.push(img.src);
    });
    setAllImages(images);
  }, [art]);

  const [ref, size] = useElementSize<HTMLDivElement>();

  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: scrollRef });
  const { scrollYProgress: windowScrollYProgress } = useScroll();

  const onWheel = useCallback(
    (e: WheelEvent) => {
      const windowScrollY = windowScrollYProgress.get();
      const scrollX = scrollXProgress.get();
      if (windowScrollY >= 1 && !(e.deltaY < 0 && scrollX == 0)) {
        e.preventDefault();
        scrollRef.current?.scrollBy({ left: e.deltaY / 3 });
      }
    },
    [windowScrollYProgress, scrollXProgress, scrollRef]
  );

  const onMoreContentWheel = useCallback(
    (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        scrollRef.current?.scrollBy({ left: e.deltaX / 3 });
      }
    },
    [scrollRef]
  );

  useEffect(() => {
    if (
      scrollRef.current &&
      scrollRef.current.scrollWidth > scrollRef.current.clientWidth
    ) {
      window.addEventListener("wheel", onWheel, { passive: false });
      scrollRef.current.addEventListener("wheel", onMoreContentWheel, {
        passive: false,
      });
    }
    return () => {
      if (scrollRef.current) {
        window.removeEventListener("wheel", onWheel);
        scrollRef.current.removeEventListener("wheel", onMoreContentWheel);
      }
    };
  }, [scrollRef]);

  if (!art) return <></>;
  return (
    <>
      <Head>
        <title>Clara Eizayaga - {art.title}</title>
      </Head>
      <div className="flex flex-col gap-5 pb-10">
        <div
          className="flex flex-wrap gap-5 items-start"
          style={{ ["--img-width" as any]: minCss(800, "100%") }}
        >
          <motion.div
            {...popUp()}
            onClick={() => setCurrentImg(0)}
            className="cursor-zoom-in w-[var(--img-width)]"
          >
            <MouseHoverScaleAnimation size={size} scale={1.03} translate={0.01}>
              <div ref={ref} className="next-image-container">
                <MaybeImage
                  src={art.src}
                  alt="Banner Image"
                  className="next-image w-[var(--img-width)]"
                  layout="fill"
                />
              </div>
            </MouseHoverScaleAnimation>
          </motion.div>
          <div>
            <div className="prose">
              <motion.h1 className="mb-4 uppercase" {...popUp(0.1)}>
                {art.title}
              </motion.h1>
              <motion.div {...popUp(0.15)}>
                {art.hasPrice ? (
                  <h3 className="mt-4 mb-3">${art.price?.toLocaleString()}</h3>
                ) : (
                  <h4 className="mt-4 mb-3 font-normal text-gray-500 uppercase">
                    Contact the seller for price.
                  </h4>
                )}
              </motion.div>
            </div>
            <motion.div {...popUp(0.2)}>
              <MaybeBody>
                <TinaMarkdown content={art.body} />
              </MaybeBody>
            </motion.div>
          </div>
        </div>
        {art.altImages && (
          <div className="flex flex-col gap-2">
            {art.altImages.length > 1 && (
              <div className="flex items-center gap-2">
                <h2 className="text-xl uppercase font-bold">More Content</h2>
                <ArrowRight size={24} fill="bold" />
              </div>
            )}
            <div
              className="flex gap-5 h-[500px] overflow-scroll w-full pb-5"
              style={{ ["--img-width" as any]: minCss(600, "100%") }}
              ref={scrollRef}
            >
              {art.altImages.map((img, ii) => {
                if (!img || !img.src) return null;
                return (
                  <motion.div
                    key={ii}
                    {...popLeft()}
                    onClick={() => setCurrentImg(ii + 1)}
                    className="cursor-zoom-in h-full"
                  >
                    <AltImage src={img?.src} className="!h-full" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <AnimatePresence>
        {currentImg !== undefined && allImages[currentImg] !== undefined && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-[55]"
            onClick={() => setCurrentImg(undefined)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.4 } }}
            exit={{ opacity: 0 }}
          >
            <div className="max-md:hidden">
              <Carousel
                current={currentImg}
                all={allImages}
                prev={() => shiftCarousel(false)}
                next={() => shiftCarousel(true)}
              />
            </div>
            <div className="md:hidden">
              <Spotlight src={allImages[currentImg]} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

type StaticUrlParameters = { slug: string };
type StaticContext = { params: StaticUrlParameters };

export const getStaticProps: GetStaticProps<
  StaticProps | ErrorProps,
  StaticUrlParameters
> = async ({ params }) => {
  const slug = params?.slug || "";

  try {
    var page = await client.queries.art({ relativePath: `${slug}.mdx` });
  } catch (e) {
    return { props: makeError(400, "Art Piece Not Found.") };
  }

  return { props: page };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const connection = await client.queries.artConnection();
  const edges = connection.data.artConnection.edges;
  const paths =
    edges
      ?.map((v) => {
        if (!v?.node) return;
        return { params: { slug: v.node._sys.filename } };
      })
      .filter((v): v is StaticContext => v !== undefined) || [];
  return { paths, fallback: false };
};

export default withError(Art);
