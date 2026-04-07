// src/app/blog/[slug]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { getArticleBySlug, urlFor, Article } from "@/lib/articles";

type Props = { params: { slug: string } };

export const revalidate = 60; // ISR

export async function generateStaticParams() {
  const articles = await import("@/lib/articles").then((mod) =>
    mod.getAllArticles(),
  );
  return articles.map((article: Article) => ({ slug: article.slug }));
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <main style={{ padding: "20px" }}>
      <article>
        <p>{article.category}</p>
        <h1>{article.title}</h1>
        <p>{article.date}</p>
        {article.image && (
          <Image
            src={urlFor(article.image).width(1200).height(700).url()}
            alt={article.title}
            width={1200}
            height={700}
            priority
          />
        )}
        <p>{article.description}</p>
        <div>{article.content}</div>
      </article>
    </main>
  );
}
