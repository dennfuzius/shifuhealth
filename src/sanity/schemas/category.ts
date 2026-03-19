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
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.en", maxLength: 96 },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
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
  ],
  preview: {
    select: {
      title: "title.en",
    },
  },
};

export default category;
