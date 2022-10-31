import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { X } from "phosphor-react";

export interface PopUpHeaderProps {
  togglePopUpNav: () => void;
  pages: { label: string; link: string }[];
}

const PopUpHeader = ({ togglePopUpNav, pages }: PopUpHeaderProps) => {
  const { route } = useRouter();
  return (
    <motion.div
      className="fixed top-0 bottom-0 inset-x-0 overflow-hidden bg-black/70 flex flex-col gap-5 px-8 pt-4 pb-9 z-50 scroll-contain scroll-contain"
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
              <Link href={link}>
                <motion.span
                  className="inline-block text-white text-2xl cursor-pointer"
                  whileHover="hover"
                  animate={route == link ? "hover" : ""}
                >
                  {label}
                  <motion.div
                    className="w-full h-0.5 bg-white"
                    initial={{ width: 0 }}
                    variants={{
                      hover: { width: "100%" },
                    }}
                    transition={{
                      ease: "easeInOut",
                      duration: 0.15,
                    }}
                  />
                </motion.span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
};

export default PopUpHeader;
