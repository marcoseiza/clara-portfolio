import Tina from "../.tina/components/TinaDynamicProvider";
import type { AppProps } from "next/app";

import "../styles/globals.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import BaseLayout from "../components/BaseLayout";
import { motion } from "framer-motion";

export interface PageProps {
  setIsGallery: Dispatch<SetStateAction<boolean>>;
}

export type PropsWithPage<T> = T & PageProps;

const App = ({ Component, pageProps, router }: AppProps) => {
  const [isGallery, setIsGallery] = useState<boolean>(false);

  const noBaseLayout = !!(Component as any).noBaseLayout;
  const noContainer = !!(Component as any).noContainer;

  useEffect(() => {
    setIsGallery(false);
  }, [router.route]);

  const content = () => (
    <motion.div
      key={router.route}
      initial="pageInitial"
      animate="pageAnimate"
      variants={{
        pageInitial: { opacity: 0 },
        pageAnimate: { opacity: 1 },
      }}
    >
      <Component {...pageProps} setIsGallery={setIsGallery} />
    </motion.div>
  );

  return (
    <Tina>
      {!noBaseLayout ? (
        <BaseLayout isGallery={isGallery} container={!noContainer}>
          {content()}
        </BaseLayout>
      ) : (
        content()
      )}
    </Tina>
  );
};

export default App;
