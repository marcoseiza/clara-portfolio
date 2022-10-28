import { useCallback, useState } from "react";
import Masonry from "react-masonry-css";
import { ArtSeries } from "../helpers/ArtGallery.types";
import useEventListener from "../helpers/hooks/UseEventListener";
import { useHeaderHeight } from "../store";
import ArtPiece from "./ArtPiece";
import { motion } from "framer-motion";
import { popUp } from "../helpers/PopUp";

export interface ArtGallerySeriesProps {
  series: ArtSeries;
  order: number;
}

const ArtGallerySeries = ({ series, order }: ArtGallerySeriesProps) => {
  const headerHeight = useHeaderHeight((state) => state.height);

  const [titleRef, setTitleRef] = useState<HTMLElement | null>(null);
  const [masonryRef, setMasonryRef] = useState<HTMLElement | null>(null);

  const [titleTop, setTitleTop] = useState<boolean>(false);

  const handleSize = useCallback(() => {
    setTitleTop((titleRef?.offsetTop || 0) < (masonryRef?.offsetTop || 0));
  }, [titleRef?.offsetTop, masonryRef?.offsetTop]);

  useEventListener("resize", handleSize);

  const seriesOffsetDelay = series.art.length * order * 0.05;

  return (
    <div className="flex flex-wrap mt-20 gap-5">
      <div className="h-auto" ref={setTitleRef}>
        {series.name && (
          <motion.h2
            className={`${
              !titleTop && "vertical-text"
            } sticky top-[calc(var(--header-height)+0.5em)] text-4xl font-bold uppercase mb-5`}
            style={{ ["--header-height" as any]: `${headerHeight}px` }}
            {...popUp(seriesOffsetDelay)}
          >
            {series.name.body}
          </motion.h2>
        )}
      </div>
      <div className="grow" ref={setMasonryRef}>
        <Masonry
          breakpointCols={{ default: 3, 800: 2, 600: 1 }}
          className="flex w-auto gap-5"
          columnClassName="flex flex-col bg-clip-padding gap-5 w-full"
        >
          {series.art.map((info, i) => (
            <motion.div key={i} {...popUp(i * 0.01 + seriesOffsetDelay)}>
              <ArtPiece info={info} />
            </motion.div>
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default ArtGallerySeries;
