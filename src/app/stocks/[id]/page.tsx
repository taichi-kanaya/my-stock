"use client";
import { useQuery } from "@apollo/client";
import { ARTICLE_QUERIES } from "@/graphql/queries";
import Loading from "@/app/loading";
import Custom500 from "@/app/errors/500";
import Link from "next/link";

export default function Page({ params }: { params: { id: string } }) {
  const { loading, error, data } = useQuery(ARTICLE_QUERIES.SINGLE_ARTICLE, {
    variables: { id: params.id },
  });
  if (loading) return <Loading />;
  if (error) {
    console.error(error);
    return <Custom500 />;
  }

  return (
    <>
      <div className="container mx-auto mt-5 px-4">
        <div className="grid grid-cols-1 gap-4">
          <h1 className="border-b-2 border-t-2 border-blue-800 py-2 text-2xl text-blue-800">
            {data.Article.title}
          </h1>
          <p>公開日: {data.Article.public_at}</p>
          <div className="mt-2">
            <p>{data.Article.body}</p>
          </div>
          <div className="mt-2 text-sm">
            <p>この記事は {data.Article.views} 名の方に閲覧されています</p>
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
