import { AnyArtTag, ArtTagType } from "../../helpers/ArtGallery";
import { useTags } from "../../store";
import GalleryOptionField from "./GalleryOptionField";

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

  const onOptionChange = (tag: AnyArtTag, checked: boolean) => {
    checked ? addTag(tag) : removeTag(tag);
  };

  return (
    <div
      className="z-50 fixed bottom-0 top-[var(--headerHeight)] right-0 bg-white p-10 flex flex-col gap-4 min-w-[15em] shadow-left"
      style={{ ["--headerHeight" as any]: `${headerHeight}px` }}
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
    </div>
  );
};

export default GalleryOptions;
