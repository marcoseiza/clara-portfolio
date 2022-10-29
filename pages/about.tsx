import type { GetStaticProps, NextPage } from "next";
import { ErrorProps, makeError } from "../helpers";
import { PropsWithPage } from "./_app";
import { motion } from "framer-motion";
import Instagram from "../components/Instagram";
import { popUp } from "../helpers/PopUp";
import {
  PageQuery,
  PageQueryVariables,
  Page as PageInfo,
} from "../.tina/__generated__/types";
import client from "../.tina/__generated__/client";
import withError from "../helpers/withError";
import { useTina } from "tinacms/dist/edit-state";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import MaybeBody from "../components/MaybeBody";
import MaybeImage from "../components/MaybeImage";

interface ServerSideProps {
  data: PageQuery;
  variables: PageQueryVariables;
  query: string;
}

const About: NextPage<PropsWithPage<ServerSideProps>> = ({
  data,
  variables,
  query,
}: PropsWithPage<ServerSideProps>) => {
  const page = useTina({ query, variables, data });

  const about = page.data?.page as PageInfo;

  if (!about) return <></>;

  let altImages = about.altImages || [];
  if (altImages.length > 4) altImages = altImages.slice(0, 4);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] min-h-[calc(100vh-var(--headerHeight)-1.5em)]">
      <motion.div className="relative h-full w-full" {...popUp()}>
        <h1 className="absolute top-2 right-0 text-8xl font-bold vertical-text opacity-50 uppercase">
          {about.title}
        </h1>
        <img
          src={about.image}
          alt="Profile picture"
          className="h-full w-full min-w-[90px] object-cover object-right opacity-60"
        />
      </motion.div>
      <div className="relative h-full w-full flex flex-col items-center p-10 pb-0 justify-between">
        <motion.div {...popUp(0.2)}>
          <MaybeBody className="prose-h1:font-normal">
            <TinaMarkdown content={about.body} />
          </MaybeBody>
        </motion.div>
        <div className="flex flex-col gap-2 items-center">
          <motion.div {...popUp(0.3)}>
            <Instagram link="https://www.instagram.com/c.eizayaga/?utm_source=ig_embed&amp%3Butm_campaign=loading" />
          </motion.div>
          {about.altImages && (
            <div className="grid grid-cols-2 w-full gap-4">
              {altImages.map((v, ii) => {
                return (
                  <motion.div key={ii} {...popUp(ii * 0.1 + 0.3)}>
                    <MaybeImage src={v?.src} alt="Alternative About Pictures" />
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<
  ServerSideProps | ErrorProps
> = async () => {
  try {
    var page = await client.queries.page({ relativePath: `about.mdx` });
  } catch (e) {
    return { props: makeError(400, "Art Piece Not Found.") };
  }

  return { props: page };
};

export default withError(About);
