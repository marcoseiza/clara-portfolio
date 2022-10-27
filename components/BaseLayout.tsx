import { PropsWithChildren } from "react";
import { useHeaderHeight } from "../store";
import Header from "./header/Header";

export interface BaseLayoutProps {
  isGallery?: boolean;
}

const BaseLayout = ({
  isGallery = false,
  children,
}: PropsWithChildren<BaseLayoutProps>) => {
  const headerHeight = useHeaderHeight((s) => s.height);
  return (
    <>
      <Header isGallery={isGallery} />
      <div
        className="md:container px-5 mx-auto pt-[var(--headerHeight)]"
        style={{
          [`--headerHeight` as any]: `${headerHeight}px`,
        }}
      >
        {children}
      </div>
    </>
  );
};

export default BaseLayout;
