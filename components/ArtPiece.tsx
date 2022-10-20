import { ArtInfo } from "../helpers/ArtGallery";

export interface ArtPieceProps {
  info: ArtInfo;
}

const ArtPiece = ({ info }: ArtPieceProps) => {
  return (
    <a
      href="/art/{art.slug}"
      className="hover:scale-[1.02] transition-transform"
    >
      <img src={info.src} alt="" className="w-full" />
    </a>
  );
};

export default ArtPiece;
