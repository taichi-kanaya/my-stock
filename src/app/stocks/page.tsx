import { contentfulClient } from '@/app/lib/apollo-client.server'
import { ARTICLE_QUERIES } from '@/app/lib/graphql/queries.server'
import Loading from '@/app/loading'
import Button from '@/app/components/basic/Button'
import ArticleCard from '@/app/components/layout/ArticleCard'

type Article = {
  id: string
  title: string
}

export default async function Page() {
  const { loading, error, data } = await contentfulClient.query({
    query: ARTICLE_QUERIES.ALL_ARTICLES,
    fetchPolicy: 'no-cache',
  })
  if (loading) return <Loading />
  if (error) {
    console.error(error)
    throw new Error('Failed to retrieve the article.')
  }

  return (
    <div className="flex items-center justify-center">
      <div className="container mx-auto p-4">
        <div className="mb-3 flex">
          <Button href="/stocks/new" isPrimary={true}>
            新規登録
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          {data.stockCollection.items.map((article: Article) => (
            <ArticleCard
              key={article.id}
              articleId={article.id}
              articleTitle={article.title}
              href={`/stocks/${article.id}`}
            ></ArticleCard>
          ))}
        </div>
      </div>
    </div>
  )
}
