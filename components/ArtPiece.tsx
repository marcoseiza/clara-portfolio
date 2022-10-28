import Image from "next/image";
import Link from "next/link";
import { ArtInfo } from "../helpers/ArtGallery.types";
import useElementSize from "../helpers/hooks/UseElementSize";
import MouseHoverScaleAnimation from "./MouseHoverScaleAnimation";

export interface ArtPieceProps {
  info: ArtInfo;
}

const ArtPiece = ({ info }: ArtPieceProps) => {
  const [ref, size] = useElementSize<HTMLAnchorElement>();

  return (
    <MouseHoverScaleAnimation
      size={size}
      scale={1.03}
      className="w-full h-full"
    >
      <Link href={`/art/${info.slug}`} ref={ref}>
        <Image src={info.src} alt="Art Piece" className="object-cover h-full" />
      </Link>
    </MouseHoverScaleAnimation>
  );
};

export default ArtPiece;
