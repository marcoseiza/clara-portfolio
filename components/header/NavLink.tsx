import { motion } from "framer-motion";
import Link from "next/link";

export interface NavLinkProps {
  current: boolean;
  link: string;
  label: string;
  size?: "2xl" | "md";
  color?: "white" | "black";
}

const NavLink = ({
  current,
  link,
  label,
  size = "md",
  color = "black",
}: NavLinkProps) => {
  return (
    <Link href={link}>
      <motion.span
        className={`inline-block text-${color} text-${size} cursor-pointer`}
        whileHover="hover"
        animate={current ? "hover" : ""}
      >
        {label}
        <motion.div
          className={`w-full h-0.5 bg-${color}`}
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
  );
};

export default NavLink;
