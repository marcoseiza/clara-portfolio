import { MouseEventHandler, PropsWithChildren } from "react";
import { motion } from "framer-motion";
import { CaretLeft, CaretRight } from "phosphor-react";
import MouseHoverScaleAnimation from "./MouseHoverScaleAnimation";
import useElementSize from "../helpers/hooks/UseElementSize";
import Image from "next/image";

export interface CarouselProps {
  current: number;
  all: string[];
  next: () => void;
  prev: () => void;
  reset: () => void;
}

const handleCarousel = (callback?: () => void): MouseEventHandler => {
  return (e) => {
    e.stopPropagation();
    callback && callback();
  };
};

export const getNext = (current: number, size: number) => {
  let next = current + 1;
  if (next == size) next = 0;
  return next;
};

export const getPrev = (current: number, size: number) => {
  let next = current - 1;
  if (next < 0) next = size - 1;
  return next;
};

const Control = ({
  onClick,
  children,
}: PropsWithChildren<{ onClick: () => void }>) => (
  <motion.div
    className="px-5 cursor-pointer"
    onClick={handleCarousel(onClick)}
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
  >
    {children}
  </motion.div>
);

interface ImgPreviewProps {
  onClick: () => void;
  src: string;
  position: "left" | "right";
}
const ImgPreview = ({ onClick, src, position }: ImgPreviewProps) => {
  const right = position == "right";
  return (
    <li
      className={`absolute h-1/2 min-h-[15em] w-auto justify-self-end ${position}-0 z-30 cursor-pointer opacity-60 ${
        right ? "origin-right" : "origin-left"
      }`}
      style={{
        transform: `rotateY(${right ? "-3deg" : "3deg"})`,
      }}
      onClick={handleCarousel(onClick)}
    >
      <div className="next-image-container-height h-full">
        <Image
          src={src}
          alt="Carousel Image"
          className="!h-full block !relative !w-auto !min-w-[unset] !max-w-[unset] !min-h-[unset]"
          layout="fill"
        />
      </div>
    </li>
  );
};

const Carousel = ({ current, all, next, prev, reset }: CarouselProps) => {
  const [ref, size] = useElementSize();

  return (
    <motion.div
      className="fixed top-0 left-0 bottom-0 right-0 bg-black/80 grid grid-cols-[auto,1fr,auto] items-center justify-center z-50"
      onClick={() => reset()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {all.length > 1 ? (
        <Control onClick={prev}>
          <CaretLeft size={48} className="text-white" fill="bold" />
        </Control>
      ) : (
        <div />
      )}
      <ul
        className="relative flex items-center justify-center z-30"
        style={{ perspective: "200px" }}
      >
        {(all.length > 2 || current == 1) && (
          <ImgPreview
            onClick={prev}
            src={all[getPrev(current, all.length)]}
            position="left"
          />
        )}
        <li className="relative z-40 m-10" onClick={handleCarousel()}>
          <MouseHoverScaleAnimation
            size={size}
            scale={1.6}
            translate={0.3}
            className="max-h-full"
            onClick
          >
            <div className="next-image-container-brute" ref={ref}>
              <Image
                src={all[current]}
                alt="Carousel Image"
                layout="fill"
                className="!h-[80vh] block !relative !w-auto !min-w-[unset] !max-w-[unset] !min-h-[unset]"
              />
            </div>
          </MouseHoverScaleAnimation>
        </li>
        {(all.length > 2 || current == 0) && (
          <ImgPreview
            onClick={next}
            src={all[getNext(current, all.length)]}
            position="right"
          />
        )}
      </ul>
      {all.length > 1 ? (
        <Control onClick={next}>
          <CaretRight size={48} className="text-white" fill="bold" />
        </Control>
      ) : (
        <div />
      )}
    </motion.div>
  );
};

export default Carousel;
