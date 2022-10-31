import { CircleNotch } from "phosphor-react";
import { motion } from "framer-motion";

const LoadingPage = () => {
  return (
    <motion.div
      className="fixed z-[55] inset-0 bg-black flex items-center justify-center opacity-100"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="animate-spin">
        <CircleNotch size={48} fill="bold" className="text-white" />
      </div>
    </motion.div>
  );
};

export default LoadingPage;
