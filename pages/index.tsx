import type { GetServerSideProps, NextPage } from "next";
import { useEffect } from "react";
import client from "../.tina/__generated__/client";
import ArtGallerySeries from "../components/ArtGallerySeries";
import ArtPiece from "../components/ArtPiece";
import Header from "../components/header/Header";
import {
  ArtSeries,
  filterArtByTags,
  getTagsFromArtSeriesList,
} from "../helpers/ArtGallery.types";
import { defaultArtSeries } from "../helpers/DefaultArtGallery";
import { useTouchTop } from "../helpers/hooks/UseScroll";
import { useHeaderHeight, useTags } from "../store";

interface ArtPiece {
  src: string;
  title: string;
  series: { name: string; id: string };
  link: string;
}

interface StaticProps {
  art: ArtPiece[];
}

const Home: NextPage<StaticProps> = ({ art }: StaticProps) => {
  useEffect(() => {
    useTags.setState({ tags: getTagsFromArtSeriesList(defaultArtSeries) });
  }, []);

  const { filteredArt, noArt } = useTags((state) => {
    let filteredArt = filterArtByTags(defaultArtSeries, state.chosenTags);
    return {
      filteredArt,
      noArt:
        filteredArt.length == 0 || filteredArt.every((v) => v.art.length == 0),
    };
  });

  const headerHeight = useHeaderHeight((state) => state.height);

  const [scrollAnchor, touched] = useTouchTop(true);

  return (
    <>
      <Header isGallery={touched} />
      <div className="md:container px-5 mx-auto">
        <div
          className="w-full h-[calc(100vh-var(--headerHeight)-2em)] mx-auto mt-[var(--headerHeight)] bg-[url('/img/default_image_1.png')] bg-center bg-no-repeat bg-cover"
          style={{ [`--headerHeight` as any]: `${headerHeight}px` }}
        />
        <div
          ref={scrollAnchor}
          id="gallery"
          className={`pt-4 pb-20 min-h-screen ${
            noArt && "flex items-center justify-center"
          }`}
        >
          {noArt && (
            <h1 className="text-xl max-w-xs text-center">
              There are no pieces in the gallery with those tags.
            </h1>
          )}
          {filteredArt.map((series, i) => {
            if (series.art.length > 0) {
              return <ArtGallerySeries key={i} series={series} />;
            }
            return <></>;
          })}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<StaticProps> = async () => {
  const art = (await client.queries.artConnection()).data.artConnection.edges
    ?.map((v) => {
      if (!v?.node) return;
      return {
        src: v.node.src,
        title: v.node.title,
        series: v.node.series,
        link: v.node._sys.filename,
      } as ArtPiece;
    })
    .filter((v): v is ArtPiece => v != undefined);

  return {
    props: {
      art: art ?? [],
    },
  };
};

export default Home;
