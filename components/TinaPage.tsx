import { PropsWithChildren } from "react";
import { Page as PageInfo } from "../.tina/__generated__/types";
import { motion } from "framer-motion";
import { popUp } from "../helpers/PopUp";
import MaybeBody from "./MaybeBody";
import { TinaMarkdown } from "tinacms/dist/rich-text";

const TinaPage = ({ children, ...page }: PropsWithChildren<PageInfo>) => {
  return (
    <div className="relative flex min-h-[calc(100vh-var(--headerHeight)-1.5em)] max-md:flex-col">
      <motion.div
        className="relative w-1/2 h-[calc(100vh-var(--headerHeight)-1.5em)] max-md:h-auto max-md:w-full max-md:min-h-[15em]"
        {...popUp()}
      >
        <h1 className="absolute top-2 right-4 text-8xl font-bold md:vertical-text opacity-80 uppercase max-md:relative max-md:text-7xl max-md:text-end max-md:py-5 max-md:top-0 max-md:right-0">
          {page.title}
        </h1>
        <img
          src={page.image}
          alt="Profile picture"
          className="h-full w-full min-w-[90px] object-cover object-[100%,70%] opacity-60 max-md:absolute max-md:h-full max-md:min-w-[calc(100%_+_5em)] max-md:top-0 max-md:-right-5"
        />
      </motion.div>
      <div className="relative h-full w-1/2 flex flex-col items-center p-10 pt-10 pb-0 justify-between max-md:w-full max-md:p-1 max-md:pt-5 max-md:gap-10">
        <motion.div {...popUp(0.2)}>
          <MaybeBody className="prose-headings:font-normal">
            <TinaMarkdown content={page.body} />
          </MaybeBody>
        </motion.div>
        {children}
      </div>
    </div>
  );
};

export default TinaPage;
