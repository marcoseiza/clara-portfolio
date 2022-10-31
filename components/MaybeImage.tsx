import { Maybe } from "../.tina/__generated__/types";

export interface MaybeImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src?: Maybe<string>;
  imageRef?: (node: HTMLImageElement | null) => void;
}

const MaybeImage = ({ src, imageRef, ...props }: MaybeImageProps) => {
  if (!src) return <></>;
  return (
    <div>
      <img ref={imageRef} src={src} {...props} />
    </div>
  );
};

export default MaybeImage;
