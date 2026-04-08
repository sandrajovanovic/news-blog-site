import { defineType } from "sanity";

const article = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    },
    { name: "description", title: "Description", type: "text" },
    { name: "content", title: "Content", type: "text" },
    {
      name: "image",
      title: "Image",
      type: "url",
    },
    { name: "category", title: "Category", type: "string" },
    { name: "date", title: "Date", type: "datetime" },
  ],
});

export default article;
