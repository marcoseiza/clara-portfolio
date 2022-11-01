export interface PopUpExtend {
  initial?: { [key: string]: any };
  whileInView?: { [key: string]: any };
  transition?: { [key: string]: any };
  viewport?: { [key: string]: any };
  [key: string]: any;
}

export const popUp = (delay: number = 0, extend?: PopUpExtend) => ({
  initial: { y: 100, opacity: 0.1, ...(extend?.initial || {}) },
  whileInView: { y: 0, opacity: 1, ...(extend?.whileInView || {}) },
  transition: {
    duration: 0.5,
    type: "ease-in",
    delay,
    ...(extend?.transition || {}),
  },
  viewport: { once: true, ...(extend?.viewport || {}) },
  ...(extend || {}),
});

export const popLeft = (delay: number = 0, extend?: PopUpExtend) => ({
  initial: { x: 100, opacity: 0.1, ...(extend?.initial || {}) },
  whileInView: { x: 0, opacity: 1, ...(extend?.whileInView || {}) },
  transition: {
    duration: 0.5,
    type: "ease-in",
    delay,
    ...(extend?.transition || {}),
  },
  viewport: { once: true, ...(extend?.viewport || {}) },
  ...(extend || {}),
});
