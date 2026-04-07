import Image from "next/image";
import Link from "next/link";
import { getAllArticles } from "@/lib/articles";

export default function HomePage() {
  const articles = getAllArticles();

  return (
    <main>
      <h1>News Blog</h1>

      <div>
        {articles.map((article) => (
          <article key={article.id}>
            <Image
              src={article.image}
              alt={article.title}
              width={800}
              height={500}
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            <h2>
              <Link href={`/blog/${article.slug}`}>{article.title}</Link>
            </h2>

            <p>{article.description}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
