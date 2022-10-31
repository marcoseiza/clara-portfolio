import { ArtSeries, ArtTagType, AVAILABLE, SOLD } from "./ArtGallery.types";

export const defaultArtSeries: ArtSeries[] = [
  {
    name: { body: "Series I", type: ArtTagType.SERIES },
    id: "series_I",
    order: 0,
    art: [
      {
        src: "https://via.placeholder.com/180x200/FF0000/1",
        tags: [SOLD],
        slug: "0a0168bc-6006-4c20-800c-b0f5f0762683",
        title: "UNTITLED",
      },
      {
        src: "https://via.placeholder.com/200x280/1",
        tags: [AVAILABLE],
        slug: "9feeb494-7dda-4243-a2e3-94bfb6744ac2",
        title: "UNTITLED",
      },
      {
        src: "https://via.placeholder.com/250x200/1",
        tags: [AVAILABLE],
        slug: "ac76f756-a1dd-4aba-9c74-535284c84f61",
        title: "UNTITLED",
      },
      {
        src: "https://via.placeholder.com/140x210/FF0000/1",
        tags: [SOLD],
        slug: "9672d5ed-cea6-4390-ad36-e883f574ff5b",
        title: "UNTITLED",
      },
      {
        src: "https://via.placeholder.com/280x300/1",
        tags: [AVAILABLE],
        slug: "0cbbaa80-174e-4e3c-904b-0dab4bc6d876",
        title: "UNTITLED",
      },
      {
        src: "https://via.placeholder.com/220x200/1",
        tags: [AVAILABLE],
        slug: "057d5da8-5b78-4d3f-9f38-344154c6cd81",
        title: "UNTITLED",
      },
    ],
  },
  {
    name: { body: "Series II", type: ArtTagType.SERIES },
    id: "series_II",
    order: 1,
    art: [
      {
        src: "https://via.placeholder.com/180x240/FF0000/1",
        tags: [SOLD],
        slug: "90116996-8e68-4ac2-a300-3fb90210a7bc",
        title: "UNTITLED",
      },
      {
        src: "https://via.placeholder.com/210x210/1",
        tags: [AVAILABLE],
        slug: "cd0b999f-2f1a-4dbf-86b3-72a8d86132ab",
        title: "UNTITLED",
      },
      {
        src: "https://via.placeholder.com/200x220/FF0000/1",
        tags: [SOLD],
        slug: "c3ca3e0f-f631-4d1f-9c24-e5350ee5b252",
        title: "UNTITLED",
      },
      {
        src: "https://via.placeholder.com/210x200/1",
        tags: [AVAILABLE],
        slug: "0880ebd4-b2c3-4604-8a4b-c5650d705d95",
        title: "UNTITLED",
      },
      {
        src: "https://via.placeholder.com/180x200/FF0000/1",
        tags: [SOLD],
        slug: "c07bcf85-15b7-4cb1-b956-5bacc339b192",
        title: "UNTITLED",
      },
      {
        src: "https://via.placeholder.com/280x200/1",
        tags: [AVAILABLE],
        slug: "454cb598-0afa-46e9-b345-8c5aaad7455c",
        title: "UNTITLED",
      },
    ],
  },
  {
    name: { body: "Series III", type: ArtTagType.SERIES },
    id: "series_III",
    order: 2,
    art: [
      {
        src: "https://via.placeholder.com/220x100/FF0000/1",
        tags: [SOLD],
        slug: "2c91227e-32a4-481c-90bc-2ce1af6b8beb",
        title: "UNTITLED",
      },
      {
        src: "https://via.placeholder.com/180x150/1",
        tags: [AVAILABLE],
        slug: "55deffd6-3ab7-422a-a793-70ee11ad9a17",
        title: "UNTITLED",
      },
      {
        src: "https://via.placeholder.com/210x180/1",
        tags: [AVAILABLE],
        slug: "55326fbe-5f3b-4cbb-a1ef-937ee9367bbe",
        title: "UNTITLED",
      },
      {
        src: "https://via.placeholder.com/210x200/1",
        tags: [AVAILABLE],
        slug: "fc3fe276-32e0-41e5-abf4-70a36125678e",
        title: "UNTITLED",
      },
      {
        src: "https://via.placeholder.com/200x250/FF0000/1",
        tags: [SOLD],
        slug: "681bd5fd-344e-42d8-ad4e-cb55b00ec6fb",
        title: "UNTITLED",
      },
      {
        src: "https://via.placeholder.com/210x200/FF0000/1",
        tags: [SOLD],
        slug: "c595f2aa-1ec2-406c-a446-0c5af07b03ff",
        title: "UNTITLED",
      },
    ],
  },
];
