export const popUp = (delay: number = 0) => ({
  initial: { y: 100, opacity: 0.1 },
  whileInView: { y: 0, opacity: 1 },
  transition: { duration: 0.5, type: "ease-in", delay },
  viewport: { once: true },
});
