import { defineSchema, defineConfig } from "tinacms";
import { client } from "./__generated__/client";

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";
const schema = defineSchema({
  // See https://tina.io/docs/tina-cloud/connecting-site/ for more information about this config
  config: {
    token: "<Your Read Only Token>", // generated on app.tina.io,
    clientId: "<Your Client ID>", // generated on app.tina.io
    branch,
  },
  collections: [
    {
      label: "Art Gallery",
      name: "art",
      path: "content/art",
      format: "mdx",
      ui: {
        router: ({ document }) => `art/${document._sys.filename}`,
      },
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "rich-text",
          label: "Description",
          name: "body",
          isBody: true,
        },
      ],
    },
  ],
});

export default schema;

// Your tina config

export const tinaConfig = defineConfig({
  client: client as any,
  schema,
});
