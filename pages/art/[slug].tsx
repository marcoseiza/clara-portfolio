import { useTina } from "tinacms/dist/edit-state";
import client from "../../.tina/__generated__/client";
import {
  ArtQuery,
  Exact,
  Art as ArtInfo,
} from "../../.tina/__generated__/types";
import Header from "../../components/header/Header";
import { useHeaderHeight } from "../../store";
import MaybeImage from "../../components/MaybeImage";
import MaybeBody from "../../components/MaybeBody";
import { maxCSS, ErrorProps, isError } from "../../helpers";
import { GetServerSideProps } from "next/types";
import Error from "../../components/Error";
import { TinaMarkdown } from "tinacms/dist/rich-text";
interface StaticProps {
  data: ArtQuery;
  variables: Exact<{ relativePath: string }>;
  query: string;
}

const Art = (props: StaticProps | ErrorProps) => {
  if (isError(props))
    return <Error code={props.error.code} title={props.error.message} />;

  const { data, variables, query } = props;
  const page = useTina({ query, variables, data });

  const art = page.data?.art as ArtInfo;

  const headerHeight = useHeaderHeight((state) => state.height);

  function renderContent(art: ArtInfo) {
    return (
      <div className="flex flex-col gap-5">
        <div
          className="flex flex-wrap gap-5 items-start"
          style={{ ["--imgWidth" as any]: maxCSS(800, "100%") }}
        >
          <MaybeImage
            src={art.src}
            alt="Banner Image"
            className="w-[var(--imgWidth)]"
          />
          <div>
            <div className="prose">
              <h1 className="mb-4 uppercase">{art.title}</h1>
              {art.hasPrice ? (
                <h3 className="mt-4 mb-3">${art.price}</h3>
              ) : (
                <h3 className="mt-4 mb-3 font-normal text-gray-500">
                  Contact the seller for a price.
                </h3>
              )}
            </div>
            <MaybeBody>
              <TinaMarkdown content={art.body} />
            </MaybeBody>
          </div>
        </div>
        <div
          className="flex flex-col gap-5"
          style={{ ["--imgWidth" as any]: maxCSS(600, "100%") }}
        >
          {art.altImages?.map((img, ii) => (
            <MaybeImage
              key={ii}
              src={img?.src}
              alt="Alternative Image"
              className="w-[var(--imgWidth)]"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div
        className="md:container px-5 mx-auto mt-[var(--headerHeight)]"
        style={{ [`--headerHeight` as any]: `${headerHeight}px` }}
      >
        {art && renderContent(art)}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  StaticProps | ErrorProps
> = async (context) => {
  const slug = context.params?.slug as unknown as string;
  let page;
  try {
    page = await client.queries.art({ relativePath: `${slug}.mdx` });
  } catch (e) {
    return {
      props: {
        error: {
          code: 400,
          message: "Art Piece Not Found.",
        },
      },
    };
  }

  return {
    props: page,
  };
};

export default Art;
