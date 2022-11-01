import {
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import useElementSize, { Size } from "../helpers/hooks/UseElementSize";
import Image from "next/image";
import ZoomOnClick from "./ZoomOnClick";
import { motion } from "framer-motion";
import { CaretLeft, CaretRight } from "phosphor-react";

const stopPropagation = (callback?: () => void): MouseEventHandler => {
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
  className = "",
  children,
}: PropsWithChildren<{ onClick: () => void; className?: string }>) => (
  <motion.div
    className={"cursor-pointer " + className}
    onClick={stopPropagation(onClick)}
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
  >
    {children}
  </motion.div>
);

interface ImgPreviewProps {
  height: number;
  onClick: () => void;
  src: string;
  position: "left" | "right";
}
const ImgPreview = ({ height, onClick, src, position }: ImgPreviewProps) => {
  const right = position == "right";
  return (
    <motion.div
      className={`absolute min-h-[15em] w-auto justify-self-end ${
        right ? "right-0" : "left-0"
      } z-30 ${right ? "origin-right" : "origin-left"}`}
      style={{
        height,
        rotateY: right ? "-3deg" : "3deg",
      }}
      onClick={stopPropagation(onClick)}
      whileTap={{ rotateY: right ? "-4deg" : "4deg" }}
    >
      <div className="next-image-container-height h-full">
        <Image
          src={src}
          alt="Carousel Image"
          className="!h-full block !relative !w-auto !min-w-[unset] !max-w-[unset] !min-h-[unset] cursor-pointer"
          layout="fill"
        />
      </div>
    </motion.div>
  );
};

export interface CarouselProps {
  current: number;
  all: string[];
  next: () => void;
  prev: () => void;
}

const Carousel = ({ current, all, next, prev }: CarouselProps) => {
  const [ref, size] = useElementSize<HTMLDivElement>();
  const [ratio, setRatio] = useState<number | undefined>(undefined);
  const [imgSize, setImgSize] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
    if (size.width == 0 || size.height == 0 || ratio === undefined) return;
    const widthSmaller = size.width < size.height;
    const newImgSize: Size = {
      width: widthSmaller ? size.width : ratio * size.height,
      height: widthSmaller ? size.width / ratio : size.height,
    };
    setImgSize(newImgSize);
  }, [size, ratio]);

  const prevImg = all[getPrev(current, all.length)];
  const nextImg = all[getNext(current, all.length)];

  return (
    <div className="relative flex items-center justify-center select-none">
      {all.length > 0 && (
        <Control onClick={prev} className="justify-self-end">
          <CaretLeft size={48} className="text-white" fill="bold" />
        </Control>
      )}
      <div
        className="relative flex items-center justify-center px-20"
        style={{ perspective: "200px" }}
      >
        {(all.length > 2 || current == 1) && (
          <ImgPreview
            onClick={prev}
            src={prevImg}
            position="left"
            height={imgSize.height * 0.7}
          />
        )}
        <div
          className="z-40 h-[90vh] w-[70vw] flex items-center justify-center pointer-events-none"
          ref={ref}
        >
          <div className="pointer-events-auto">
            <ZoomOnClick size={imgSize} scale={1.9}>
              <Image
                src={all[current]}
                {...imgSize}
                alt="Spotlight of painting"
                onLoadingComplete={({ naturalWidth, naturalHeight }) => {
                  setRatio(naturalWidth / naturalHeight);
                }}
              />
            </ZoomOnClick>
          </div>
        </div>
        {(all.length > 2 || current == 0) && (
          <ImgPreview
            onClick={next}
            src={nextImg}
            position="right"
            height={imgSize.height * 0.7}
          />
        )}
      </div>
      {all.length > 0 && (
        <Control onClick={next} className="justify-self-start">
          <CaretRight size={48} className="text-white" fill="bold" />
        </Control>
      )}
    </div>
  );
};

export default Carousel;
