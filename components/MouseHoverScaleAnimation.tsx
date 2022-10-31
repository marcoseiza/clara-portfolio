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
  useTransform,
  animate,
  type AnimationOptions,
} from "framer-motion";
import { Size } from "../helpers/hooks/UseElementSize";

export interface MouseHoverScaleAnimationProps {
  size: Size;
  scale?: number;
  translate?: number;
  noScaleOnHover?: boolean;
  className?: string;
  noHiddenOverflow?: boolean;
  onClick?: boolean;
}

const MouseHoverScaleAnimation = ({
  children,
  size: { width, height },
  scale = 1.01,
  translate = 0.005,
  className = "",
  noScaleOnHover = false,
  noHiddenOverflow = false,
  onClick = false,
}: PropsWithChildren<MouseHoverScaleAnimationProps>) => {
  const [hoverScale, transformScale] = [scale, translate];
  const delay = 0.2;
  const constraint = Math.min(width * transformScale, height * transformScale);
  const clamp = [constraint, -constraint];

  const [animationToggled, setAnimationToggled] = useState<boolean>(!onClick);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const translateX = useTransform(x, [0, width], clamp);
  const translateY = useTransform(y, [0, height], clamp);

  const transition: AnimationOptions<number> = {
    type: "spring",
    stiffness: 70,
    damping: 20,
  };

  const reset = useCallback(() => {
    animate(x, width / 2, transition);
    animate(y, height / 2, transition);
    setAnimationToggled(!onClick);
  }, [x, y, width, height]);

  const toggleAnimation = () => {
    if (animationToggled) reset();
    else setAnimationToggled(!animationToggled);
  };

  useEffect(() => {
    if (width == 0 || height == 0) return;
    x.set(width / 2);
    y.set(height / 2);
  }, [width, height, reset]);

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!animationToggled) return;
    const { left, top } = e.currentTarget.getBoundingClientRect();
    animate(x, e.pageX - left, transition);
    animate(y, e.pageY - top - window.scrollY, transition);
  };

  const handleMouseLeave = () => reset();

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={
        `${!noHiddenOverflow && "overflow-hidden"} ${
          animationToggled ? "cursor-inherit" : "cursor-zoom-in"
        } ` + className
      }
    >
      <motion.div
        whileHover={
          !noScaleOnHover && animationToggled ? { scale: hoverScale } : {}
        }
        initial={noScaleOnHover ? { scale: hoverScale } : {}}
        transition={{ duration: delay }}
        className={className}
      >
        <motion.div
          style={{ translateX, translateY }}
          className={className}
          onClick={() => toggleAnimation()}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MouseHoverScaleAnimation;
