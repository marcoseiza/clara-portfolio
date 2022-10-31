import useElementSize from "../helpers/hooks/UseElementSize";
import MaybeImage from "./MaybeImage";
import MouseHoverScaleAnimation from "./MouseHoverScaleAnimation";

export interface AltImageProps {
  src: string | undefined;
  className: string;
}

const AltImage = ({ src, className }: AltImageProps) => {
  const [ref, size] = useElementSize<HTMLImageElement>();
  return (
    <MouseHoverScaleAnimation
      size={size}
      className="w-fit"
      scale={1.02}
      translate={0.01}
    >
      <MaybeImage
        src={src}
        alt="Alternative Image"
        className={className}
        imageRef={ref}
      />
    </MouseHoverScaleAnimation>
  );
};

export default AltImage;
