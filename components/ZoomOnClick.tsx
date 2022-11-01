import {
  MouseEventHandler,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  motion,
  useMotionValue,
  animate,
  AnimationOptions,
  useTransform,
} from "framer-motion";
import { Size } from "../helpers/hooks/UseElementSize";

export interface ZoomOnClickProps {
  size: Size;
  scale?: number;
  translate?: number;
}

const transition: AnimationOptions<number> = {
  type: "spring",
  stiffness: 200,
  damping: 30,
};

const ZoomOnClick = ({
  size: { width, height },
  scale = 1.5,
  translate = 0.5,
  children,
}: PropsWithChildren<ZoomOnClickProps>) => {
  const [toggle, setToggle] = useState<boolean>(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    x.set(width / 2);
    y.set(height / 2);
  }, [width, height, x, y]);

  const constraint = Math.min(width * translate, height * translate);
  const clamp = [constraint, -constraint];
  const translateX = useTransform(x, [0, width], clamp);
  const translateY = useTransform(y, [0, height], clamp);

  const handleClick: MouseEventHandler = useCallback(
    (e) => {
      e.stopPropagation();
      const newToggle = !toggle;
      setToggle(newToggle);

      const { left, top } = e.currentTarget.getBoundingClientRect();

      let { newX, newY } = {
        newX: newToggle ? e.pageX - left : width / 2,
        newY: newToggle ? e.pageY - top - window.scrollY : height / 2,
      };

      animate(x, newX, transition);
      animate(y, newY, transition);
    },
    [setToggle, toggle, width, height, x, y]
  );

  return (
    <motion.div
      onClick={handleClick}
      style={{ translateX, translateY }}
      transition={{ delay: 1 }}
      className={toggle ? "cursor-zoom-out" : "cursor-zoom-in"}
    >
      <motion.div animate={{ scale: toggle ? scale : 1.0 }}>
        {children}
      </motion.div>
    </motion.div>
  );
};

export default ZoomOnClick;
