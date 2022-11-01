import Tina from "../.tina/components/TinaDynamicProvider";
import type { AppProps } from "next/app";

import "../styles/globals.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import BaseLayout from "../components/BaseLayout";
import { motion, AnimatePresence } from "framer-motion";
import { useLoading } from "../store";
import LoadingPage from "../components/LoadingPage";
import Head from "next/head";

export interface PageProps {
  setIsGallery: Dispatch<SetStateAction<boolean>>;
}

export type PropsWithPage<T> = T & PageProps;

const App = ({ Component, pageProps, router }: AppProps) => {
  const [isGallery, setIsGallery] = useState<boolean>(false);

  const noBaseLayout = !!(Component as any).noBaseLayout;
  const noContainer = !!(Component as any).noContainer;
  const [showLoading, setShowLoading] = useState<boolean>(
    ((Component as any).showLoading as boolean | undefined) || false
  );

  useEffect(() => {
    setIsGallery(false);
    useLoading.setState({ isLoading: showLoading });
    useLoading.subscribe((s) => {
      setShowLoading(s.isLoading);
    });
    document.body.style.overflow = showLoading ? "hidden" : "";
    document.body.style.height = showLoading ? "100vh" : "";
  }, [router.route, showLoading]);

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
    <>
      <Tina>
        <AnimatePresence>{showLoading && <LoadingPage />}</AnimatePresence>
        <div style={{ opacity: showLoading ? 100 : 100 }}>
          {!noBaseLayout ? (
            <BaseLayout isGallery={isGallery} container={!noContainer}>
              {content()}
            </BaseLayout>
          ) : (
            content()
          )}
        </div>
      </Tina>
    </>
  );
};

export default App;
