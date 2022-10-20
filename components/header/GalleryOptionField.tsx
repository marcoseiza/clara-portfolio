import { CheckSquare, Square } from "phosphor-react";
import { AnyArtTag } from "../../helpers/ArtGallery.types";

export interface GalleryOptionFieldProps {
  tag: AnyArtTag;
  checked: boolean;
  onClick: (tag: AnyArtTag, checked: boolean) => void;
}

const GalleryOptionField = ({
  tag,
  checked,
  onClick,
}: GalleryOptionFieldProps) => {
  const onClickInner = () => {
    checked = !checked;
    onClick(tag, checked);
  };

  return (
    <button onClick={onClickInner} className="flex items-center gap-2">
      {checked ? (
        <CheckSquare size={32} weight="bold" />
      ) : (
        <Square size={32} weight="bold" />
      )}
      <span className="text-xl font-bold uppercase">{tag.body}</span>
    </button>
  );
};

export default GalleryOptionField;
