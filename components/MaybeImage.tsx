import Image from "next/image";
import { Maybe } from "../.tina/__generated__/types";

export interface MaybeImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src?: Maybe<string>;
  refSet?: (node: HTMLDivElement | null) => void;
}

const MaybeImage = ({ src, alt, className, refSet }: MaybeImageProps) => {
  if (!src) return <></>;
  return (
    <div ref={refSet}>
      <Image src={src} alt={alt} className={className} />
    </div>
  );
};

export default MaybeImage;
