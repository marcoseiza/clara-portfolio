import { Sliders } from "phosphor-react";
import { useState } from "react";
import { useHeaderHeight, useTags } from "../../store";
import GalleryOptions from "./GalleryOptions";
import Tag from "./Tag";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";

const GalleryHeader = () => {
  const { tags, chosenTags, removeTag } = useTags((state) => ({
    tags: state.tags,
    chosenTags: state.chosenTags,
    removeTag: state.removeTag,
  }));

  const [showGalleryOptions, setShowGalleryOption] = useState(false);
  const onFilterClick = () => {
    setShowGalleryOption(!showGalleryOptions);
  };

  const height = useHeaderHeight((s) => s.height);

  return (
    <>
      <Link href="/#gallery">
        <span className="text-2xl font-bold">GALLERY</span>
      </Link>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          {chosenTags.map((t, i) => (
            <Tag key={i} tag={t} onRemove={removeTag} />
          ))}
        </div>
        <button
          onClick={onFilterClick}
          className="cursor-pointer hover:bg-neutral-600/20 rounded-md p-1 transition-colors"
        >
          <Sliders size={32} />
        </button>
      </div>
      <AnimatePresence>
        {showGalleryOptions && (
          <GalleryOptions headerHeight={height} tags={tags} />
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryHeader;
