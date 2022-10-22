import type { GetStaticProps, NextPage } from "next";
import { useEffect } from "react";
import ArtGallerySeries from "../components/ArtGallerySeries";
import Header from "../components/header/Header";
import {
  ArtSeries,
  filterArtByTags,
  getTagsFromArtSeriesList,
} from "../helpers/ArtGallery.types";
import { defaultArtSeries } from "../helpers/DefaultArtGallery";
import { useTouchTop } from "../helpers/hooks/UseScroll";
import { useHeaderHeight, useTags } from "../store";

interface StaticProps {
  artSeries: ArtSeries[];
}

const Home: NextPage<StaticProps> = ({ artSeries }: StaticProps) => {
  useEffect(() => {
    useTags.setState({ tags: getTagsFromArtSeriesList(artSeries) });
  }, []);

  const { filteredArt, noArt } = useTags((state) => {
    let filteredArt = filterArtByTags(artSeries, state.chosenTags);
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

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  return {
    props: {
      artSeries: defaultArtSeries,
    },
  };
};

export default Home;
