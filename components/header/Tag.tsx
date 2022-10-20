import { X } from "phosphor-react";
import { AnyArtTag } from "../../helpers/ArtGallery.types";

export interface TagProps {
  tag: AnyArtTag;
  onRemove: (tag: AnyArtTag) => void;
}

const Tag = ({ tag, onRemove }: TagProps) => (
  <div className="flex items-center bg-neutral-200 p-1 px-2 gap-1 rounded-xl">
    <button onClick={() => onRemove(tag)} className="flex">
      <X
        size={20}
        weight="bold"
        className="transition-colors hover:fill-red-600"
      />
    </button>
    <span className="flex uppercase">{tag.body}</span>
  </div>
);

export default Tag;
