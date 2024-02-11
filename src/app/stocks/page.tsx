import { contentfulClient } from "@/lib/apollo-client.server";
import { Article } from "@/types/article.server";
import { ARTICLE_QUERIES } from "@/graphql/queries.server";
import Loading from "@/app/loading";
import Link from "next/link";
import Card from "@/components/stocks/article-card.server";

export default async function Page() {
  const { loading, error, data } = await contentfulClient.query({
    query: ARTICLE_QUERIES.ALL_ARTICLES,
  });
  if (loading) return <Loading />;
  if (error) {
    console.error(error);
    throw new Error("Failed to retrieve the article.");
  }

  return (
    <div className="flex items-center justify-center">
      <div className="container mx-auto p-4">
        <div className="mb-3 flex">
          <Link href="/stocks/new">
            <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
              新規登録
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          {data.stockCollection.items.map((article: Article) => (
            <Card key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
