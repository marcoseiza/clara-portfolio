import Masonry from "react-masonry-css";
import { ArtSeries } from "../helpers/ArtGallery.types";
import { useHeaderHeight } from "../store";
import ArtPiece from "./ArtPiece";
import { LayoutGroup, motion } from "framer-motion";
import { popUp } from "../helpers/PopUp";

export interface ArtGallerySeriesProps {
  series: ArtSeries;
  order: number;
}

const ArtGallerySeries = ({ series, order }: ArtGallerySeriesProps) => {
  const headerHeight = useHeaderHeight((state) => state.height);

  const seriesOffsetDelay = series.art.length * order * 0.05;

  return (
    <div className="flex flex-col mt-20 gap-5">
      <div className="h-auto grow-0">
        {series.name && (
          <motion.h2
            className={`relative text-4xl font-bold uppercase mb-5`}
            style={{ ["--header-height" as any]: `${headerHeight}px` }}
            {...popUp(seriesOffsetDelay)}
          >
            {series.name.body}
          </motion.h2>
        )}
      </div>
      <div>
        <LayoutGroup>
          <Masonry
            breakpointCols={{ default: 3, 1024: 2, 768: 1 }}
            className="flex w-auto gap-5"
            columnClassName="flex flex-col bg-clip-padding gap-5 w-full"
          >
            {series.art.map((info, i) => (
              <motion.div
                key={i}
                whileTap="tap"
                {...popUp(i * 0.01 + seriesOffsetDelay)}
                variants={{
                  tap: {
                    scale: 0.95,
                    transition: {
                      duration: 0.15,
                    },
                  },
                }}
              >
                <ArtPiece info={info} />
              </motion.div>
            ))}
          </Masonry>
        </LayoutGroup>
      </div>
    </div>
  );
};

export default ArtGallerySeries;
