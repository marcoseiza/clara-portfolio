import { FunnelSimple } from "phosphor-react";
import { useRef, useState, useEffect } from "react";
import useElementSize from "../../helpers/hooks/UseElementSize";
import { useTags } from "../../store";
import GalleryOptions from "./GalleryOptions";
import Tag from "./Tag";

export interface GalleryHeaderProps {
  passHeight?: (height: number) => void;
}

const GalleryHeader = ({ passHeight }: GalleryHeaderProps) => {
  const [headerRef, { height }] = useElementSize();
  useEffect(() => passHeight && passHeight(height), [height]);

  const { tags, chosenTags, removeTag } = useTags((state) => ({
    tags: state.tags,
    chosenTags: state.chosenTags,
    removeTag: state.removeTag,
  }));

  const [showGalleryOptions, setShowGalleryOption] = useState(false);
  const onFilterClick = () => {
    setShowGalleryOption(!showGalleryOptions);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`z-50 fixed w-full top-0 py-4 px-8 bg-white flex items-center justify-between shadow-lg transition-shadow`}
      >
        <h1 className="text-2xl font-bold">GALLERY</h1>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            {chosenTags.map((t, i) => (
              <Tag key={i} tag={t} onRemove={removeTag} />
            ))}
          </div>
          <button onClick={onFilterClick}>
            <FunnelSimple size={32} weight="bold" />
          </button>
        </div>
      </header>
      {showGalleryOptions && (
        <GalleryOptions headerHeight={height} tags={tags} />
      )}
    </>
  );
};

export default GalleryHeader;
