import { Maybe } from "../.tina/__generated__/types";
import Image, { type ImageProps } from "next/image";

export interface MaybeImageProps extends Omit<ImageProps, "src"> {
  src?: Maybe<string>;
}

const MaybeImage = ({ src, alt, ...props }: MaybeImageProps) => {
  if (!src) return <></>;
  return (
    <>
      <Image
        src={src}
        alt={alt}
        {...props}
        className={"next-image " + props.className}
      />
    </>
  );
};

export default MaybeImage;
