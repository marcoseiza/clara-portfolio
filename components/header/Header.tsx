import { useEffect } from "react";
import { useHeaderHeight } from "../../store";
import GalleryHeader from "./GalleryHeader";
import NavHeader from "./NavHeader";
import useScroll from "../../helpers/hooks/UseScroll";
import useElementSize from "../../helpers/hooks/UseElementSize";

export interface HeaderProps {
  isGallery?: boolean;
}

const Header = ({ isGallery }: HeaderProps) => {
  const HeaderImpl = isGallery ? GalleryHeader : NavHeader;

  const scrollY = useScroll();

  const [headerRef, { height }] = useElementSize();
  useEffect(() => {
    useHeaderHeight.setState({ height });
  }, [height]);

  return (
    <header
      ref={headerRef}
      className={`fixed w-full top-0 py-4 px-8 bg-white flex items-center justify-between z-50 ${
        scrollY == 0 ? "" : "shadow-lg"
      } transition-shadow`}
    >
      <HeaderImpl />
    </header>
  );
};

export default Header;
