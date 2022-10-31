import { PropsWithChildren } from "react";
import { Page as PageInfo } from "../.tina/__generated__/types";
import { motion } from "framer-motion";
import { popUp } from "../helpers/PopUp";
import MaybeBody from "./MaybeBody";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Image from "next/image";

const TinaPage = ({ children, ...page }: PropsWithChildren<PageInfo>) => {
  return (
    <div className="relative flex min-h-screen max-md:flex-col max-md:px-5">
      <motion.div
        className="relative w-1/2 h-screen max-md:h-auto max-md:w-full max-md:min-h-[15em]"
        {...popUp()}
      >
        <h1 className="absolute z-20 opacity-40 top-[calc(var(--headerHeight)+3.5rem)] right-4 text-8xl font-bold md:vertical-text uppercase max-md:relative max-md:text-7xl max-md:text-end max-md:py-5 max-md:mt-[var(--headerHeight)] max-md:top-0 max-md:right-0">
          {page.title}
        </h1>
        <div className="relative h-full max-md:absolute max-md:h-full max-md:min-w-[calc(100%_+_5em)] max-md:top-0 max-md:-right-5 next-image-container-height">
          <Image
            src={page.image}
            alt="Profile picture"
            layout="fill"
            className={`h-full w-full min-w-[90px] object-cover object-[100%,70%] opacity-[var(--image-opacity)]`}
            style={{
              ["--image-opacity" as any]: page.opacity
                ? `${page.opacity}%`
                : "60%",
            }}
          />
        </div>
      </motion.div>
      <div className="relative h-full w-1/2 flex flex-col items-center p-10 pt-[calc(var(--headerHeight)+4em)] pb-0 justify-between max-md:w-full max-md:p-1 max-md:pt-5 max-md:gap-10">
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
