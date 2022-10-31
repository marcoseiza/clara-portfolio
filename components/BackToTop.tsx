import Link from "next/link";
import { motion } from "framer-motion";
import { CaretUp } from "phosphor-react";
import { useRouter } from "next/router";

const BackToTop = () => {
  const { pathname } = useRouter();
  return (
    <Link href={pathname}>
      <motion.div
        className="fixed bottom-10 right-10 py-2 px-4 bg-black rounded-full flex items-center gap-1 cursor-pointer"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        <CaretUp size={24} weight="bold" {...{ className: "text-white" }} />
        <span className="uppercase text-white font-bold">top</span>
      </motion.div>
    </Link>
  );
};

export default BackToTop;
