import { useEffect } from "react";
import { useState } from "react";
import { useHeaderHeight } from "../../store";
import GalleryHeader from "./GalleryHeader";
import NavHeader from "./NavHeader";
import { AnimateSharedLayout, AnimatePresence } from "framer-motion";

export interface HeaderProps {
  isGallery?: boolean;
}

const Header = ({ isGallery }: HeaderProps) => {
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  useEffect(() => {
    useHeaderHeight.setState({ height: headerHeight });
  }, [headerHeight]);

  const HeaderImpl = isGallery ? GalleryHeader : NavHeader;

  return (
    <AnimateSharedLayout>
      <HeaderImpl passHeight={setHeaderHeight} />
    </AnimateSharedLayout>
  );
};

export default Header;
