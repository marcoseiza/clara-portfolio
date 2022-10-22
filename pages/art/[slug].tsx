import type { GetServerSideProps } from "next";
import { useTina } from "tinacms/dist/edit-state";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import client from "../../.tina/__generated__/client";
import { ArtQuery, Exact } from "../../.tina/__generated__/types";
import Header from "../../components/header/Header";

interface StaticProps {
  data: ArtQuery;
  variables: Exact<{ relativePath: string }>;
  query: string;
}

const Art = ({ data, variables, query }: StaticProps) => {
  const page = useTina({ query, variables, data });

  const body = page.data?.art?.body;

  return (
    <>
      <Header />
      <div className="md:container px-5 mx-auto">
        <article className="prose">
          {body && <TinaMarkdown content={body} />}
        </article>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<StaticProps> = async (
  context
) => {
  const slug = context.params?.slug as unknown as string;
  const page = await client.queries.art({ relativePath: `${slug}.mdx` });
  return {
    props: page,
  };
};

export default Art;
