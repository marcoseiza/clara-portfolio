import { defineSchema, defineConfig } from "tinacms";
import { client } from "./__generated__/client";

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const token =
  process.env.NODE_ENV == "production"
    ? process.env.TINA_READ_ONLY_TOKEN
    : undefined;
const clientId =
  process.env.NODE_ENV == "production" ? process.env.TINA_CLIENT_ID : undefined;
const schema = defineSchema({
  // See https://tina.io/docs/tina-cloud/connecting-site/ for more information about this config
  config: {
    token, // generated on app.tina.io,
    clientId, // generated on app.tina.io
    // token: undefined,
    // clientId: undefined,
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
          type: "object",
          label: "SEO Management",
          name: "seo",
          fields: [
            {
              type: "string",
              label: "Title",
              description:
                "This is the page title (e.g. used in google searches).",
              name: "title",
              required: true,
            },
            {
              type: "string",
              label: "Description",
              description:
                "This is the page description (e.g. used in google searches). Under 160 characters.",
              name: "description",
              required: true,
              ui: {
                validate: (v: string | undefined) => {
                  if (v && v.length > 160) {
                    return `Description must be less than 160 characters long. It is now ${v.length} character long.`;
                  }
                },
              },
            },
            {
              type: "image",
              label: "Media Image",
              name: "image",
              description: "This is the image used for social media links.",
              required: true,
            },
            {
              type: "string",
              label: "Media Title",
              description: "This is the title used for social media links.",
              name: "mediaTitle",
              required: true,
            },
            {
              type: "string",
              label: "Media Description",
              description:
                "This is the description used for social media links. Under 60 characters.",
              name: "mediaDescription",
              required: true,
              ui: {
                validate: (v: string | undefined) => {
                  if (v && v.length > 60) {
                    return `Description must be less than 60 characters long. It is now ${v.length} character long.`;
                  }
                },
              },
            },
          ],
        },
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
      name: "page",
      label: "Page",
      path: "content/page",
      format: "mdx",
      ui: {
        router: ({ document }) => {
          if (document._sys.filename == "about") return "/about";
          if (document._sys.filename == "contact") return "/contact";
        },
      },
      defaultItem: () => ({
        opacity: 60,
      }),
      fields: [
        {
          type: "object",
          label: "SEO Management",
          name: "seo",
          fields: [
            {
              type: "string",
              label: "Title",
              description:
                "This is the page title (e.g. used in google searches).",
              name: "title",
              required: true,
            },
            {
              type: "string",
              label: "Description",
              description:
                "This is the page description (e.g. used in google searches). Under 160 characters.",
              name: "description",
              required: true,
              ui: {
                validate: (v: string | undefined) => {
                  if (v && v.length > 160) {
                    return `Description must be less than 160 characters long. It is now ${v.length} character long.`;
                  }
                },
              },
            },
            {
              type: "image",
              label: "Media Image",
              name: "image",
              description: "This is the image used for social media links.",
              required: true,
            },
            {
              type: "string",
              label: "Media Title",
              description: "This is the title used for social media links.",
              name: "mediaTitle",
              required: true,
            },
            {
              type: "string",
              label: "Media Description",
              description:
                "This is the description used for social media links. Under 60 characters.",
              name: "mediaDescription",
              required: true,
              ui: {
                validate: (v: string | undefined) => {
                  if (v && v.length > 60) {
                    return `Description must be less than 60 characters long. It is now ${v.length} character long.`;
                  }
                },
              },
            },
          ],
        },
        {
          type: "image",
          label: "Hero Image",
          name: "image",
          required: true,
        },
        {
          type: "number",
          label: "Image Opacity",
          name: "opacity",
          ui: {
            step: 1,
            validate: (val) => {
              if (val < 0 || val > 100) {
                return "The number must be between 0 and 100!!";
              }
            },
          },
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
          type: "rich-text",
          label: "Body",
          name: "body",
          isBody: true,
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
              required: true,
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
          type: "object",
          label: "SEO Management",
          name: "seo",
          fields: [
            {
              type: "string",
              label: "Title",
              description:
                "This is the page title (e.g. used in google searches).",
              name: "title",
              required: true,
            },
            {
              type: "string",
              label: "Description",
              description:
                "This is the page description (e.g. used in google searches). Under 160 characters.",
              name: "description",
              required: true,
              ui: {
                validate: (v: string | undefined) => {
                  if (v && v.length > 160) {
                    return `Description must be less than 160 characters long. It is now ${v.length} character long.`;
                  }
                },
              },
            },
            {
              type: "image",
              label: "Media Image",
              name: "image",
              description: "This is the image used for social media links.",
              required: true,
            },
            {
              type: "string",
              label: "Media Title",
              description: "This is the title used for social media links.",
              name: "mediaTitle",
              required: true,
            },
            {
              type: "string",
              label: "Media Description",
              description:
                "This is the description used for social media links. Under 60 characters.",
              name: "mediaDescription",
              required: true,
              ui: {
                validate: (v: string | undefined) => {
                  if (v && v.length > 60) {
                    return `Description must be less than 60 characters long. It is now ${v.length} character long.`;
                  }
                },
              },
            },
          ],
        },
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
