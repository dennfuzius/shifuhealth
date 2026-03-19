const article = {
  name: "article",
  title: "Article",
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
      name: "excerpt",
      title: "Excerpt",
      type: "object",
      fields: [
        { name: "de", title: "Deutsch", type: "text", rows: 3 },
        { name: "en", title: "English", type: "text", rows: 3 },
      ],
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", title: "Alt Text", type: "string" },
            { name: "caption", title: "Caption", type: "string" },
          ],
        },
      ],
    },
    {
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    },
    {
      name: "symptomTags",
      title: "Symptom Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    },
    {
      name: "bodyPart",
      title: "Body Part",
      type: "string",
      options: {
        list: [
          { title: "Head", value: "head" },
          { title: "Chest", value: "chest" },
          { title: "Abdomen", value: "abdomen" },
          { title: "Back", value: "back" },
          { title: "Limbs", value: "limbs" },
          { title: "Whole Body", value: "whole-body" },
        ],
      },
    },
    {
      name: "season",
      title: "Season",
      type: "string",
      options: {
        list: [
          { title: "Spring", value: "spring" },
          { title: "Summer", value: "summer" },
          { title: "Late Summer", value: "late-summer" },
          { title: "Autumn", value: "autumn" },
          { title: "Winter", value: "winter" },
          { title: "All Seasons", value: "all" },
        ],
      },
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    },
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "category.title.en",
      media: "featuredImage",
    },
  },
};

export default article;
