import Image from "next/image";
import { MouseEventHandler, useEffect, useState } from "react";
import useElementSize, { Size } from "../helpers/hooks/UseElementSize";
import ZoomOnClick from "./ZoomOnClick";

export interface SpotlightProps {
  src: string;
}

const Spotlight = ({ src }: SpotlightProps) => {
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

  return (
    <div
      className="relative h-[90vh] w-[90vw] flex items-center justify-center"
      ref={ref}
    >
      <ZoomOnClick size={imgSize}>
        <Image
          src={src}
          {...imgSize}
          alt="Spotlight of painting"
          onLoadingComplete={({ naturalWidth, naturalHeight }) => {
            setRatio(naturalWidth / naturalHeight);
          }}
        />
      </ZoomOnClick>
    </div>
  );
};

export default Spotlight;
