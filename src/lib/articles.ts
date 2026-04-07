import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

import { dataset, projectId, apiVersion } from "../sanity/env";

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // brzina; false za sveže podatke
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export async function getAllArticles() {
  const query = `*[_type == "article"] | order(date desc) {
    _id,
    title,
    slug,
    description,
    content,
    image,
    category,
    date
  }`;
  return client.fetch(query);
}

export async function getArticleBySlug(slug: string) {
  const query = `*[_type == "article" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    description,
    content,
    image,
    category,
    date
  }`;
  return client.fetch(query, { slug });
}
