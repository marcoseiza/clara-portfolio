import type { GetStaticProps, NextPage } from "next";
import { ErrorProps, makeError } from "../helpers";
import { PropsWithPage } from "./_app";
import withError from "../helpers/withError";
import ContactForm from "../components/ContactForm";
import {
  PageQuery,
  PageQueryVariables,
  Page as PageInfo,
} from "../.tina/__generated__/types";
import { useTina } from "tinacms/dist/edit-state";
import MaybeBody from "../components/MaybeBody";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { popUp } from "../helpers/PopUp";
import client from "../.tina/__generated__/client";
import { motion } from "framer-motion";
import { EnvelopeSimple } from "phosphor-react";
import TinaPage from "../components/TinaPage";

interface ServerSideProps {
  data: PageQuery;
  variables: PageQueryVariables;
  query: string;
}

const Contact: NextPage<PropsWithPage<ServerSideProps>> = ({
  data,
  variables,
  query,
}: PropsWithPage<ServerSideProps>) => {
  const page = useTina({ query, variables, data });

  const contact = page.data?.page as PageInfo;

  if (!contact) return <></>;

  return (
    <TinaPage {...contact}>
      <>
        <motion.div
          className="flex gap-3 items-center mb-10 max-md:mb-3"
          {...popUp(0.3)}
        >
          <EnvelopeSimple size={32} weight="bold" />
          <a
            href="mailto:claraeizayaga@gmail.com"
            className="font-bold uppercase"
          >
            claraeizayaga@gmail.com
          </a>
        </motion.div>
        <motion.div
          className="w-full flex items-start justify-center mb-5"
          {...popUp(0.4)}
        >
          <ContactForm />
        </motion.div>
      </>
    </TinaPage>
  );
};

export const getStaticProps: GetStaticProps<
  ServerSideProps | ErrorProps
> = async () => {
  try {
    var page = await client.queries.page({ relativePath: `contact.mdx` });
  } catch (e) {
    return { props: makeError(400, "Art Piece Not Found.") };
  }

  return { props: page };
};

export default withError(Contact);
