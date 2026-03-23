const category = {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "object",
      fields: [
        { name: "de", title: "Deutsch", type: "string" },
        { name: "en", title: "English", type: "string" },
      ],
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.en", maxLength: 96 },
    },
    {
      name: "description",
      title: "Description",
      type: "object",
      fields: [
        { name: "de", title: "Deutsch", type: "text", rows: 3 },
        { name: "en", title: "English", type: "text", rows: 3 },
      ],
    },
    {
      name: "color",
      title: "Color (Hex)",
      type: "string",
      description: "Hex color for UI display, e.g. #3B6853",
    },
    {
      name: "image",
      title: "Category Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "title.de",
      media: "image",
    },
  },
};

export default category;
