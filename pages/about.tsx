import type { GetServerSideProps, NextPage } from "next";
import { ErrorProps, isError } from "../helpers";
import Error from "../components/Error";
import { PropsWithPage } from "./_app";
import { motion } from "framer-motion";
import Instagram from "../components/Instagram";
import { popUp } from "../helpers/PopUp";

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
        <img
          src="/img/clara-about.jpeg"
          alt="Profile picture"
          className="h-full w-full min-w-[90px] object-cover object-right opacity-60"
        />
      </motion.div>
      <div className="relative h-full w-1/2 min-w-[520px] flex flex-col items-center p-10 justify-between">
        <motion.p className="text-3xl font-light leading-10" {...popUp(0.2)}>
          Clara Eizayaga is a 27 year old artist. She is an architect and alumna
          of Cornell University's professional architecture program and is
          currently focusing on studying nature's beauty through thick acrylic
          layers, strokes, and colors, representing nature's timeless state.
        </motion.p>
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
