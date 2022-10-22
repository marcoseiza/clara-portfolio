import { useEffect } from "react";
import { useState } from "react";
import { useHeaderHeight } from "../../store";
import GalleryHeader from "./GalleryHeader";
import NavHeader from "./NavHeader";

export interface HeaderProps {
  isGallery?: boolean;
}

const Header = ({ isGallery }: HeaderProps) => {
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  useEffect(() => {
    useHeaderHeight.setState({ height: headerHeight });
  }, [headerHeight]);

  if (isGallery) {
    return <GalleryHeader passHeight={setHeaderHeight} />;
  } else {
    return <NavHeader passHeight={setHeaderHeight} />;
  }
};

export default Header;
