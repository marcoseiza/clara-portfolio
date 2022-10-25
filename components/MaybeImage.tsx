import React from "react";
import { Maybe } from "../.tina/__generated__/types";

export interface MaybeImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src?: Maybe<string>;
}

const MaybeImage = ({ src, alt, className }: MaybeImageProps) => {
  if (!src) return <></>;
  return <img src={src} alt={alt} className={className} />;
};

export default MaybeImage;
