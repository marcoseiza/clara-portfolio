import { PropsWithChildren } from "react";
import { useHeaderHeight } from "../store";
import Header from "./header/Header";

export interface BaseLayoutProps {
  isGallery?: boolean;
  container?: boolean;
}

const BaseLayout = ({
  isGallery = false,
  container = true,
  children,
}: PropsWithChildren<BaseLayoutProps>) => {
  const headerHeight = useHeaderHeight((s) => s.height);
  const containerCSS = container
    ? "md:container px-5 mx-auto pt-[var(--headerHeight)]"
    : "";
  const contentStyle = { [`--headerHeight` as any]: `${headerHeight}px` };
  return (
    <>
      <Header isGallery={isGallery} translucent={!container} />
      <div className={`relative ${containerCSS}`} style={contentStyle}>
        {children}
      </div>
    </>
  );
};

export default BaseLayout;
