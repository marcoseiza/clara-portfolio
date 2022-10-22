import dynamic from "next/dynamic";
import React, { PropsWithChildren } from "react";
const TinaProvider = dynamic(() => import("./TinaProvider"), { ssr: false });
import { TinaEditProvider } from "tinacms/dist/edit-state";

const DynamicTina: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <TinaEditProvider editMode={<TinaProvider>{children}</TinaProvider>}>
        {children}
      </TinaEditProvider>
    </>
  );
};

export default DynamicTina;
