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
    media: {
      tina: {
        publicFolder: "public",
        mediaRoot: "img",
      },
    },
  },
  collections: [
    {
      name: "index",
      label: "Index",
      path: "content/index",
      format: "mdx",
      ui: {
        router: ({ document }) =>
          document._sys.filename == "index" ? "/home" : undefined,
      },
      fields: [
        {
          type: "image",
          label: "Hero Image",
          name: "image",
          required: true,
        },
        {
          type: "object",
          name: "series",
          label: "Series",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: `${item.series}` };
            },
          },
          fields: [
            {
              type: "reference",
              label: "Series",
              name: "series",
              collections: ["series"],
              required: true,
              ui: {
                validate: (value) => {
                  if (value == undefined) {
                    return "A series must be chosen.";
                  }
                  if (!Array.isArray(value) && (value as string).length == 0) {
                    return "An option must be chosen.";
                  }
                },
              },
            },
          ],
        },
      ],
    },
    {
      label: "Art Series",
      name: "series",
      path: "content/series",
      format: "mdx",
      fields: [
        {
          type: "string",
          label: "Name",
          name: "name",
          required: true,
        },
      ],
    },
    {
      label: "Art Gallery",
      name: "art",
      path: "content/art",
      format: "mdx",
      ui: {
        router: ({ document }) => `art/${document._sys.filename}`,
      },
      defaultItem: () => ({
        hasPrice: true,
        sold: false,
        price: 0,
      }),
      fields: [
        {
          type: "reference",
          label: "Series",
          name: "series",
          collections: ["series"],
          required: true,
        },
        {
          type: "boolean",
          label: "Sold",
          name: "sold",
          required: true,
        },
        {
          type: "string",
          label: "Title",
          name: "title",
          isTitle: true,
          required: true,
        },
        {
          type: "boolean",
          label: "Has Price?",
          name: "hasPrice",
          required: true,
        },
        {
          type: "number",
          label: "Price",
          name: "price",
          ui: {
            step: 0.01,
            validate: (val) => {
              if (val < 0) {
                return "The number must be positive!!";
              }
            },
          },
        },
        {
          type: "rich-text",
          label: "Description",
          name: "body",
          isBody: true,
          required: true,
        },
        {
          type: "image",
          label: "Banner Image",
          name: "src",
          required: true,
        },
        {
          type: "object",
          label: "Alternative Media",
          name: "altImages",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: `Image Path: ${item?.src}` };
            },
          },
          fields: [
            {
              type: "image",
              label: "Image",
              name: "src",
            },
          ],
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
