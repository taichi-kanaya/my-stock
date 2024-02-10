import React from "react";
import Link from "next/link";

interface ArticleProps {
  article: Article;
}

const Card: React.FC<ArticleProps> = ({ article }) => {
  return (
    <Link href={`/stocks/${article.id}`}>
      <div className="rounded-lg border bg-white p-4">
        <div className="px-1 py-4">
          <div className="mb-2 text-xl font-bold">{article.title}</div>
          <p className="text-base text-gray-700">ID: {article.id}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
