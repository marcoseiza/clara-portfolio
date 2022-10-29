import { useEffect } from "react";
import { useHeaderHeight } from "../../store";
import GalleryHeader from "./GalleryHeader";
import NavHeader from "./NavHeader";
import useScroll from "../../helpers/hooks/UseScroll";
import useElementSize from "../../helpers/hooks/UseElementSize";

export interface HeaderProps {
  isGallery?: boolean;
  translucent?: boolean;
}

const Header = ({ isGallery, translucent = false }: HeaderProps) => {
  const HeaderImpl = isGallery ? GalleryHeader : NavHeader;

  const scrollY = useScroll();

  const [headerRef, { height }] = useElementSize();
  useEffect(() => {
    useHeaderHeight.setState({ height });
  }, [height]);

  const inactiveScrollColor = translucent
    ? "bg-neutral-200/30"
    : "bg-transparent";

  return (
    <header
      ref={headerRef}
      className={`fixed w-full top-0 py-4 px-8 flex items-center justify-between z-50 ${
        scrollY == 0 ? inactiveScrollColor : "shadow-lg !bg-white"
      } transition-all hover:bg-white`}
    >
      <HeaderImpl />
    </header>
  );
};

export default Header;
