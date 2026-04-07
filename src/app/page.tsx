import Image from "next/image";
import Link from "next/link";
import { getAllArticles, urlFor, Article } from "@/lib/articles";

export default async function HomePage() {
  const articles: Article[] = await getAllArticles();

  return (
    <main>
      <h1>News Blog</h1>

      <div>
        {articles.map((article: Article, index: number) => (
          <article key={article._id}>
            {article.image && (
              <Image
                src={urlFor(article.image).width(800).height(500).url()}
                alt={article.title}
                width={800}
                height={500}
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  maxWidth: "800px",
                  height: "auto",
                }}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : undefined}
              />
            )}
            <h2>
              <Link href={`/blog/${article.slug.current}`}>
                {article.title}
              </Link>
            </h2>
            <p>{article.description}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
