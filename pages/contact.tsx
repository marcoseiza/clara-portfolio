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
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] min-h-[calc(100vh-var(--headerHeight)-1.5em)]">
      <motion.div className="relative h-full w-full" {...popUp()}>
        <h1 className="absolute top-2 right-0 text-8xl font-bold vertical-text opacity-50 uppercase">
          {contact.title}
        </h1>
        <img
          src={contact.image}
          alt="Profile picture"
          className="h-full w-full min-w-[90px] object-cover object-right opacity-60"
        />
      </motion.div>
      <div className="w-full flex flex-col p-10">
        <motion.div
          className="w-full mb-10 flex items-start justify-self-center"
          {...popUp(0.2)}
        >
          <MaybeBody className="prose-h1:font-normal">
            <TinaMarkdown content={contact.body} />
          </MaybeBody>
        </motion.div>
        <motion.div className="flex gap-3 items-center mb-10" {...popUp(0.3)}>
          <EnvelopeSimple size={32} weight="bold" />
          <a
            href="mailto:claraeizayaga@gmail.com"
            className="font-bold uppercase"
          >
            claraeizayaga@gmail.com
          </a>
        </motion.div>
        <motion.div
          className="w-full flex items-start justify-center"
          {...popUp(0.4)}
        >
          <ContactForm />
        </motion.div>
      </div>
    </div>
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
