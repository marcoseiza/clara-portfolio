import React, { PropsWithChildren } from "react";
import TinaCMS from "tinacms";
import { tinaConfig } from "../schema";

// Importing the TinaProvider directly into your page will cause Tina to be added to the production bundle.
// Instead, import the tina/provider/index default export to have it dynamially imported in edit-moode
/**
 *
 * @private Do not import this directly, please import the dynamic provider instead
 */
const TinaProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <TinaCMS {...(tinaConfig as any)}>{children}</TinaCMS>;
};

export default TinaProvider;
