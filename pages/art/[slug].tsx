import { useTina } from "tinacms/dist/edit-state";
import client from "../../.tina/__generated__/client";
import {
  ArtQuery,
  Art as ArtInfo,
  ArtQueryVariables,
} from "../../.tina/__generated__/types";
import MaybeImage from "../../components/MaybeImage";
import MaybeBody from "../../components/MaybeBody";
import { maxCSS, ErrorProps, isError, makeError } from "../../helpers";
import { GetServerSideProps } from "next/types";
import Error from "../../components/Error";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { motion, LayoutGroup } from "framer-motion";
import { popUp } from "../../helpers/PopUp";

interface ServerSideProps {
  data: ArtQuery;
  variables: ArtQueryVariables;
  query: string;
}

const Art = (props: ServerSideProps | ErrorProps) => {
  if (isError(props))
    return <Error code={props.error.code} title={props.error.message} />;

  const { data, variables, query } = props;
  const page = useTina({ query, variables, data });

  const art = page.data?.art as ArtInfo;

  if (!art) return <></>;

  return (
    <div className="flex flex-col gap-5">
      <div
        className="flex flex-wrap gap-5 items-start"
        style={{ ["--imgWidth" as any]: maxCSS(800, "100%") }}
      >
        <motion.div {...popUp()}>
          <MaybeImage
            src={art.src}
            alt="Banner Image"
            className="w-[var(--imgWidth)]"
          />
        </motion.div>
        <div>
          <div className="prose">
            <motion.h1 className="mb-4 uppercase" {...popUp(0.1)}>
              {art.title}
            </motion.h1>
            <motion.div {...popUp(0.15)}>
              {art.hasPrice ? (
                <h3 className="mt-4 mb-3">${art.price?.toLocaleString()}</h3>
              ) : (
                <h4 className="mt-4 mb-3 font-normal text-gray-500 uppercase">
                  Contact the seller for price.
                </h4>
              )}
            </motion.div>
          </div>
          <motion.div {...popUp(0.2)}>
            <MaybeBody>
              <TinaMarkdown content={art.body} />
            </MaybeBody>
          </motion.div>
        </div>
      </div>
      <div
        className="flex flex-col gap-5"
        style={{ ["--imgWidth" as any]: maxCSS(600, "100%") }}
      >
        <LayoutGroup>
          {art.altImages?.map((img, ii) => (
            <motion.div {...popUp(ii * 0.1)}>
              <MaybeImage
                key={ii}
                src={img?.src}
                alt="Alternative Image"
                className="w-[var(--imgWidth)]"
              />
            </motion.div>
          ))}
        </LayoutGroup>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<
  ServerSideProps | ErrorProps
> = async (context) => {
  const slug = context.params?.slug as unknown as string;

  try {
    var page = await client.queries.art({ relativePath: `${slug}.mdx` });
  } catch (e) {
    return { props: makeError(400, "Art Piece Not Found.") };
  }

  return { props: page };
};

export default Art;
