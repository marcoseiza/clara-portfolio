import { AnyArtTag, ArtTagType } from "../../helpers/ArtGallery.types";
import { useTags } from "../../store";
import GalleryOptionField from "./GalleryOptionField";
import { motion } from "framer-motion";
import { useCallback } from "react";

export interface GalleryOptionsProps {
  headerHeight: number;
  tags: AnyArtTag[];
}

const GalleryOptions = ({ headerHeight, tags }: GalleryOptionsProps) => {
  const seriesTags = tags.filter((t) => t.type == ArtTagType.SERIES);
  const pieceTags = tags.filter((t) => t.type == ArtTagType.PIECE);

  const { addTag, removeTag, hasTag } = useTags(
    ({ addTag, removeTag, hasTag }) => ({
      addTag,
      removeTag,
      hasTag,
    })
  );

  const onOptionChange = useCallback(
    (tag: AnyArtTag, checked: boolean) => {
      checked ? addTag(tag) : removeTag(tag);
    },
    [addTag, removeTag]
  );

  return (
    <motion.div
      className="z-50 fixed bottom-0 top-[var(--headerHeight)] right-0 bg-white p-10 flex flex-col gap-4 min-w-[15em] shadow-left"
      style={{ ["--headerHeight" as any]: `${headerHeight}px` }}
      initial={{ x: "100%" }}
      exit={{ x: "100%" }}
      animate={{ x: 0 }}
      transition={{ ease: "easeInOut" }}
    >
      {seriesTags.map((tag, i) => {
        return (
          <GalleryOptionField
            key={i}
            tag={tag}
            onClick={onOptionChange}
            checked={hasTag(tag)}
          />
        );
      })}
      <hr className="h-1 bg-black" />
      {pieceTags.map((tag, i) => {
        return (
          <GalleryOptionField
            key={i}
            tag={tag}
            onClick={onOptionChange}
            checked={hasTag(tag)}
          />
        );
      })}
    </motion.div>
  );
};

export default GalleryOptions;
