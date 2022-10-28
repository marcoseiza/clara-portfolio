import { ArtInfo } from "../helpers/ArtGallery.types";
import useElementSize from "../helpers/hooks/UseElementSize";
import MouseHoverScaleAnimation from "./MouseHoverScaleAnimation";

export interface ArtPieceProps {
  info: ArtInfo;
}

const ArtPiece = ({ info }: ArtPieceProps) => {
  const [ref, size] = useElementSize<HTMLImageElement>();

  return (
    <MouseHoverScaleAnimation
      size={size}
      scale={1.03}
      className="w-full h-full"
    >
      <a href={`/art/${info.slug}`}>
        <img src={info.src} alt="" className="object-cover h-full" ref={ref} />
      </a>
    </MouseHoverScaleAnimation>
  );
};

export default ArtPiece;
