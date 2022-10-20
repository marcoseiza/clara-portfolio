import { useEffect, useState } from "react";

const useScroll = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return scrollPosition;
};

export const useScrollRef = <T extends HTMLElement = HTMLDivElement>(
  offset?: number
): [(node: T | null) => void, number] => {
  const [ref, setRef] = useState<T | null>(null);

  const scroll = useScroll();

  let delta = 0;
  if (ref) delta = ref.offsetTop - scroll - (offset || 0);

  return [setRef, delta];
};

export const useTouchTop = <T extends HTMLElement = HTMLDivElement>(
  offset?: number
): [(node: T | null) => void, boolean] => {
  const [touched, setTouched] = useState<boolean>(false);

  const [ref, scroll] = useScrollRef<T>(offset);

  useEffect(() => {
    if (!touched && scroll <= 0) {
      setTouched(true);
    } else if (touched && scroll > 0) {
      setTouched(false);
    }
  }, [scroll]);

  return [ref, touched];
};

export default useScroll;
