import { contentfulClient } from "@/lib/apollo-client.server";
import { ARTICLE_QUERIES } from "@/graphql/queries.server";
import Loading from "@/app/loading";
import Link from "next/link";
import { format } from "date-fns";

export default async function Page({ params }: { params: { id: string } }) {
  const { loading, error, data } = await contentfulClient.query({
    query: ARTICLE_QUERIES.SINGLE_ARTICLE,
    variables: { id: parseInt(params.id) },
  });
  if (loading) return <Loading />;
  if (error) {
    console.error(error);
    throw new Error("Failed to retrieve the article.");
  }

  // 記事を取得
  const article = data.stockCollection.items[0];

  // 公開日をフォーマット
  const formattedDate = format(new Date(article.publicAt), "yyyy/MM/dd");

  // 記事本文を取得
  const articleBody = article.body.json.content[0].content[0].value;

  return (
    <>
      <div className="container mx-auto mt-4 px-4">
        <div className="space-x-4 pb-4">
          <Link href={`/stocks/edit/${params.id}`}>
            <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
              編集する
            </button>
          </Link>
          <Link href={`/stocks/delete/${params.id}`}>
            <button className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700">
              削除する
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <h1 className="border-b-2 border-t-2 border-blue-800 py-2 text-2xl text-blue-800">
            {article.title}
          </h1>
          <p>公開日: {formattedDate}</p>
          <div className="mt-2">
            <p>{articleBody}</p>
          </div>
          <div className="mt-2 text-sm">
            <p>この記事は {article.views} 名の方に閲覧されています</p>
          </div>
        </div>
      </div>
      <div className="my-10 text-center">
        <Link
          className="my-10 rounded bg-gray-800 px-4 py-2 font-bold text-white hover:bg-gray-600"
          href="/"
        >
          トップへ戻る
        </Link>
      </div>
    </>
  );
}
