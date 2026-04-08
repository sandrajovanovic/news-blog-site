import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { dataset, projectId, apiVersion } from "../sanity/env";

// Sanity client
const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // false za sveže podatke
});

// Image URL builder
const builder = imageUrlBuilder(client);
export function urlFor(source: any) {
  return builder.image(source);
}

// Tip za Article
export interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  content?: any; // možeš dodatno tipizovati ako želiš
  image?: any;
  category?: string;
  date?: string;
}

// Fetch svih članaka
export async function getAllArticles(): Promise<Article[]> {
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
  const res: Article[] = await client.fetch(query);
  return res;
}

// Fetch članka po slug-u
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const query = `*[_type == "article" && slug.current == "${slug}"][0]{
    _id,
    title,
    slug,
    description,
    content,
    image,
    category,
    date
  }`;
  const res: Article | null = await client.fetch(query);
  return res;
}
