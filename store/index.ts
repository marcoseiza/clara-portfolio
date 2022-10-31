import create from "zustand";
import { AnyArtTag } from "../helpers/ArtGallery.types";

interface UseTags {
  tags: AnyArtTag[];
  chosenTags: AnyArtTag[];
  addTag: (tag: AnyArtTag) => void;
  removeTag: (tag: AnyArtTag) => void;
  hasTag: (tag: AnyArtTag) => boolean;
}
export const useTags = create<UseTags>((set, get) => ({
  tags: [],
  chosenTags: [],
  addTag: (tag: AnyArtTag) => {
    set((state) => ({ chosenTags: state.chosenTags.concat(tag) }));
  },
  removeTag: (tag: AnyArtTag) => {
    set((state) => ({ chosenTags: state.chosenTags.filter((t) => t != tag) }));
  },
  hasTag: (tag: AnyArtTag): boolean => {
    return !!get().chosenTags.find((t) => t == tag);
  },
}));

interface UseHeaderHeight {
  height: number;
}
export const useHeaderHeight = create<UseHeaderHeight>(() => ({ height: 0 }));

interface UseHeaderPopUp {
  show: boolean;
  toggle: () => void;
}
export const useHeaderPopUp = create<UseHeaderPopUp>((set) => ({
  show: false,
  toggle: () =>
    set((state) => {
      document.body.style.overflow = !state.show ? "hidden" : "";
      return { show: !state.show };
    }),
}));

interface UseLoading {
  isLoading: boolean;
  stopLoading: () => void;
}
export const useLoading = create<UseLoading>((set) => ({
  isLoading: false,
  stopLoading: () => set(() => ({ isLoading: false })),
}));
