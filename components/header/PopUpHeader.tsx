import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { X } from "phosphor-react";
import NavLink from "./NavLink";

export interface PopUpHeaderProps {
  togglePopUpNav: () => void;
  pages: { label: string; link: string }[];
}

const PopUpHeader = ({ togglePopUpNav, pages }: PopUpHeaderProps) => {
  const { route } = useRouter();
  return (
    <motion.div
      className="fixed top-0 bottom-0 inset-x-0 overflow-hidden bg-black/80 flex flex-col gap-5 px-8 pt-4 pb-9 z-50 scroll-contain"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">CLARA EIZAYAGA</h1>
        <div
          className="cursor-pointer hover:bg-neutral-200/20 rounded-md p-1 transition-colors"
          onClick={togglePopUpNav}
        >
          <X size={32} className="text-white" />
        </div>
      </div>
      <nav className="pt-3">
        <ul className="flex flex-col gap-2">
          {pages.map(({ label, link }, ii) => (
            <motion.li
              key={ii}
              className="inline"
              initial={{ y: -20, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { delay: ii * 0.05, ease: "easeInOut" },
              }}
              exit={{ opacity: 0 }}
              onClick={togglePopUpNav}
            >
              <NavLink
                current={route == link}
                label={label}
                link={link}
                size="2xl"
                color="white"
              />
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
};

export default PopUpHeader;
