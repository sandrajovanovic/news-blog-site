// importArticlesWithCloudinary.ts
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config"; // ovo automatski učitava .env fajl
import sanityClient from "@sanity/client";
import cloudinary from "cloudinary";

// --- Cloudinary konfiguracija ---
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// --- Sanity konfiguracija ---
const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: false, // za pisanje
  token: process.env.SANITY_API_TOKEN!,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Putanja do JSON fajla ---
const articlesPath = path.join(__dirname, "..", "data", "articles.json");
const articles = JSON.parse(fs.readFileSync(articlesPath, "utf-8"));

// --- Funkcija za upload slike na Cloudinary ---
async function uploadImageToCloudinary(imagePath: string) {
  const fullPath = path.join(__dirname, "..", "..", "public", imagePath);
  const result = await cloudinary.v2.uploader.upload(fullPath, {
    folder: "articles",
  });
  return result.secure_url;
}

// --- Import članaka u Sanity ---
async function importArticles() {
  for (const article of articles) {
    // 1️⃣ Upload slike
    const imageUrl = await uploadImageToCloudinary(article.image);
    console.log("Cloudinary URL:", imageUrl); // vidi URL odmah

    // 2️⃣ Kreiraj dokument za Sanity
    const doc = {
      _type: "article",
      title: article.title,
      slug: { _type: "slug", current: article.slug },
      description: article.description,
      content: article.content,
      category: article.category,
      date: article.date,
      image: imageUrl, // direktno Cloudinary URL kao string
    };

    // 3️⃣ Kreiraj dokument u Sanity
    await client.create(doc);
    console.log("Imported:", article.title);
  }
}

// --- Pokretanje skripte ---
importArticles()
  .then(() => console.log("All articles imported with Cloudinary images ✅"))
  .catch((err) => console.error(err));
