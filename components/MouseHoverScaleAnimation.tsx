import {
  MouseEventHandler,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Size } from "../helpers/hooks/UseElementSize";

export interface MouseHoverScaleAnimationProps {
  size: Size;
  scale?: number;
  className?: string;
}

const MouseHoverScaleAnimation = ({
  children,
  size: { width, height },
  scale = 1.01,
  className = "",
}: PropsWithChildren<MouseHoverScaleAnimationProps>) => {
  const [hoverScale, transformScale] = [scale, 0.005];
  const delay = 0.2;
  const constraint = Math.min(width * transformScale, height * transformScale);
  const clamp = [constraint, -constraint];

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  let animateX: undefined | ReturnType<typeof animate>;
  let animateY: undefined | ReturnType<typeof animate>;

  const translateX = useTransform(x, [0, width], clamp);
  const translateY = useTransform(y, [0, height], clamp);

  const reset = useCallback(() => {
    x.set(width / 2);
    y.set(height / 2);
    animateX?.stop();
    animateY?.stop();
  }, [x, y, width, height, animateX, animateY]);

  useEffect(() => {
    if (width == 0 || height == 0) return;
    reset();
  }, [width, height, reset]);

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    animateX = animate(x, e.pageX - left);
    animateY = animate(y, e.pageY - top - window.scrollY);
  };

  const handleMouseLeave = () => reset();

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`overflow-hidden ` + className}
    >
      <motion.div
        whileHover={{ scale: hoverScale }}
        transition={{ duration: delay }}
        className={className}
      >
        <motion.div style={{ translateX, translateY }} className={className}>
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MouseHoverScaleAnimation;
