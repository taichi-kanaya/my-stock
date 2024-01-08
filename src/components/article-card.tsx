// Article.tsx
import React from 'react';

interface ArticleProps {
  article: Article;
}

const Card: React.FC<ArticleProps> = ({ article }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{article.title}</div>
        <p className="text-gray-700 text-base">
          ID: {article.id}
        </p>
      </div>
    </div>
  );
};

export default Card;