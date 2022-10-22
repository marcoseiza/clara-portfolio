import { useEffect } from "react";
import useElementSize from "../../helpers/hooks/UseElementSize";
import useScroll from "../../helpers/hooks/UseScroll";

export interface NavHeaderProps {
  passHeight?: (height: number) => void;
}

const NavHeader = ({ passHeight }: NavHeaderProps) => {
  const scrollY = useScroll();

  const [headerRef, { height }] = useElementSize();
  useEffect(() => passHeight && passHeight(height), [height]);

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 py-4 px-8 bg-white flex items-center justify-between ${
        scrollY == 0 ? "" : "shadow-lg"
      } transition-shadow`}
    >
      <h1 className="text-2xl font-bold">CLARA EIZAYAGA</h1>
      <nav className="flex items-center gap-4">
        <a href="/#gallery">GALLERY</a>
        <a href="/">ABOUT</a>
        <a href="/">CONTACT</a>
      </nav>
    </header>
  );
};

export default NavHeader;
