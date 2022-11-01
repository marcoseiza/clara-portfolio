import type { GetStaticProps, NextPage } from "next";
import { ErrorProps, makeError } from "../helpers";
import { PropsWithPage } from "./_app";
import { motion, LayoutGroup } from "framer-motion";
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
import TinaPage from "../components/TinaPage";
import Head from "next/head";

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
    <TinaPage {...about}>
      <Head>
        <title>{about.seo?.title}</title>
        <meta name="description" content={about.seo?.description} key="desc" />
        <meta property="og:title" content={about.seo?.mediaTitle} />
        <meta property="og:description" content={about.seo?.mediaDescription} />
        <meta property="og:image" content={about.seo?.image} />
      </Head>
      <div className="flex flex-col gap-2 items-center pb-5 w-full">
        <motion.div {...popUp(0.3)}>
          <Instagram link="https://www.instagram.com/c.eizayaga/?utm_source=ig_embed&amp%3Butm_campaign=loading" />
        </motion.div>
        <LayoutGroup>
          {about.altImages && (
            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 align-center">
              {altImages.map((v, ii) => {
                return (
                  <motion.div
                    key={ii}
                    {...popUp(ii * 0.1 + 0.3)}
                    className="next-image-container"
                  >
                    <MaybeImage
                      src={v?.src}
                      alt="Alternative About Pictures"
                      layout="fill"
                    />
                  </motion.div>
                );
              })}
            </div>
          )}
        </LayoutGroup>
      </div>
    </TinaPage>
  );
};

export const getStaticProps: GetStaticProps<
  ServerSideProps | ErrorProps
> = async () => {
  try {
    var page = await client.queries.page({ relativePath: `about.mdx` });
  } catch (e) {
    console.log(e);
    return { props: makeError(400, "Error parsing content.") };
  }

  return { props: page };
};

const AboutWithError = withError(About);
(AboutWithError as any).noContainer = true;

export default AboutWithError;
