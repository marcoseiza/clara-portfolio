import { useEffect } from "react";
import useElementSize from "../../helpers/hooks/UseElementSize";
import useScroll from "../../helpers/hooks/UseScroll";
import { motion } from "framer-motion";

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
      className={`fixed w-full top-0 py-4 px-8 bg-white flex items-center justify-between ${
        scrollY == 0 ? "" : "shadow-lg"
      } transition-shadow`}
    >
      <h1 className="text-2xl font-bold">
        <a href="/">CLARA EIZAYAGA</a>
      </h1>
      <nav className="flex items-center gap-4">
        <motion.div layoutId="gallery" transition={{ duration: 0 }}>
          <a href="/#gallery">GALLERY</a>
        </motion.div>
        <a href="/">ABOUT</a>
        <a href="/">CONTACT</a>
      </nav>
    </header>
  );
};

export default NavHeader;
