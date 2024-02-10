import { contentfulClient } from "@/lib/apollo-client";
import { Article } from "@/types/article";
import { ARTICLE_QUERIES } from "@/graphql/queries";
import Loading from "@/app/loading";
import Card from "@/components/stocks/article-card";

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
    <div className="flex items-center justify-center bg-gradient-to-bl from-blue-50 to-violet-50">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          {data.stockCollection.items.map((article: Article) => (
            <Card key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
