import Link from "next/link";
import { ArtInfo } from "../helpers/ArtGallery.types";
import useElementSize from "../helpers/hooks/UseElementSize";
import MouseHoverScaleAnimation from "./MouseHoverScaleAnimation";
import { motion } from "framer-motion";
import Image from "next/image";

export interface ArtPieceProps {
  info: ArtInfo;
}

const ArtPiece = ({ info }: ArtPieceProps) => {
  const [ref, size] = useElementSize<HTMLDivElement>();

  return (
    <motion.div className="relative overflow-hidden" whileHover="hover">
      <MouseHoverScaleAnimation
        size={size}
        scale={1.03}
        translate={0.02}
        className="w-full h-fit"
      >
        <Link href={`/art/${info.slug}`}>
          <div ref={ref} className="relative h-fit next-image-container">
            <Image
              src={info.src}
              alt="Art Piece"
              layout="fill"
              className="next-image cursor-pointer"
              draggable="false"
            />
          </div>
        </Link>
      </MouseHoverScaleAnimation>
      <motion.div
        className="absolute left-2 bottom-2 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0, x: "-100%" }}
        variants={{ hover: { opacity: 1, x: 0 } }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <h2 className="text-4xl text-white font-bold uppercase drop-shadow-[1px_2px_5px_rgb(0_0_0_/_0.3)]">
          {info.title}
        </h2>
      </motion.div>
    </motion.div>
  );
};

export default ArtPiece;
