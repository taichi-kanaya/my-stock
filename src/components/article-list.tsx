'use client';
import { useQuery } from '@apollo/client';
import Card from './article-card';
import { Article } from '../../types/article';
import { ALL_ARTICLES_QUERY } from '../graphql/queries'; 

const ArticleList: React.FC = () => {
  const {loading, error, data, refetch } = useQuery(ALL_ARTICLES_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return <p>Error :(</p>;
  }

  const handleReload = () => {
    refetch();
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <button onClick={handleReload}>Reload</button>
      {data.allArticles.map((article: Article) => (
        <Card key={article.id} article={article} />
      ))}
    </div>
  );
}

export default ArticleList;