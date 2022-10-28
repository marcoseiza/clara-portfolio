import type { GetServerSideProps, NextPage } from "next";
import { ErrorProps, isError } from "../helpers";
import Error from "../components/Error";
import { PropsWithPage } from "./_app";
import { motion } from "framer-motion";
import Instagram from "../components/Instagram";
import { popUp } from "../helpers/PopUp";
import Image from "next/image";

interface ServerSideProps {}

const About: NextPage<PropsWithPage<ServerSideProps>> = (
  props: PropsWithPage<ServerSideProps> | ErrorProps
) => {
  if (isError(props))
    return <Error code={props.error.code} title={props.error.message} />;

  return (
    <div className="w-full h-[calc(100vh-var(--headerHeight)-1.5em)] flex place-items-center">
      <motion.div className="relative h-full w-1/2" {...popUp()}>
        <h1 className="absolute top-2 right-0 text-8xl font-bold vertical-text opacity-50">
          ABOUT ME
        </h1>
        <Image
          src="/img/clara-about.jpeg"
          alt="Profile picture"
          className="h-full w-full min-w-[90px] object-cover object-right opacity-60"
        />
      </motion.div>
      <div className="relative h-full w-1/2 min-w-[520px] flex flex-col items-center p-10 justify-between">
        <motion.div {...popUp(0.2)}>
          <p className="text-3xl font-light leading-10">
            Clara is a 27 year old artist. She is an architect and alumna of
            Cornell University&apos;s professional architecture program. Her
            current focus is in studying nature&apos;s beauty through thick
            acrylic layers, strokes and colors, representing nature&apos;s
            timeless state.
          </p>
        </motion.div>
        <motion.div {...popUp(0.4)}>
          <Instagram link="https://www.instagram.com/c.eizayaga/?utm_source=ig_embed&amp%3Butm_campaign=loading" />
        </motion.div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<
  ServerSideProps | ErrorProps
> = async () => {
  return { props: {} };
};

export default About;
