import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

/* ── Schemas (inlined to avoid import path issues) ───── */

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
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.en", maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
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
      type: "object",
      fields: [
        {
          name: "de",
          title: "Deutsch",
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
          name: "en",
          title: "English",
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
      ],
    },
    {
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt Text", type: "string" }],
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
          { title: "Kopf / Head", value: "head" },
          { title: "Brust / Chest", value: "chest" },
          { title: "Bauch / Abdomen", value: "abdomen" },
          { title: "Rücken / Back", value: "back" },
          { title: "Gliedmaßen / Limbs", value: "limbs" },
          { title: "Ganzer Körper / Whole Body", value: "whole-body" },
        ],
      },
    },
    {
      name: "season",
      title: "Season",
      type: "string",
      options: {
        list: [
          { title: "Frühling / Spring", value: "spring" },
          { title: "Sommer / Summer", value: "summer" },
          { title: "Spätsommer / Late Summer", value: "late-summer" },
          { title: "Herbst / Autumn", value: "autumn" },
          { title: "Winter", value: "winter" },
          { title: "Alle / All Seasons", value: "all" },
        ],
      },
    },
    {
      name: "readingTime",
      title: "Reading Time (minutes)",
      type: "number",
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    },
    {
      name: "seoTitle",
      title: "SEO Title",
      type: "object",
      fields: [
        { name: "de", title: "Deutsch", type: "string" },
        { name: "en", title: "English", type: "string" },
      ],
    },
    {
      name: "seoDescription",
      title: "SEO Description",
      type: "object",
      fields: [
        { name: "de", title: "Deutsch", type: "text", rows: 2 },
        { name: "en", title: "English", type: "text", rows: 2 },
      ],
    },
  ],
  orderings: [
    {
      title: "Published Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
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
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.en", maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
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
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "title.de",
    },
  },
};

/* ── Config ───────────────────────────────────────────── */

export default defineConfig({
  name: "shifuhealth",
  title: "ShifuHealth CMS",
  projectId: "wuro9vba",
  dataset: "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Articles")
              .schemaType("article")
              .child(
                S.documentTypeList("article")
                  .title("Articles")
                  .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
              ),
            S.divider(),
            S.listItem()
              .title("Categories")
              .schemaType("category")
              .child(S.documentTypeList("category").title("Categories")),
          ]),
    }),
  ],
  schema: {
    types: [article, category],
  },
});
