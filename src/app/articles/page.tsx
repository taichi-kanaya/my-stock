import Loading from '@/app/loading'
import Button from '@/components/basic/Button'
import ArticleCard from '@/components/layout/ArticleCard'
import getAllArticles from '@/features/articles/actions/getAllArticles'

export default async function Page() {
  // 記事を全て取得する
  const { loading, error, data } = await getAllArticles()
  if (loading) return <Loading />
  if (error) {
    console.error(error)
    throw new Error('Failed to retrieve the article.')
  }

  return (
    <div className="flex items-center justify-center">
      <div className="container mx-auto p-4">
        <div className="mb-3 flex">
          <Button href="/articles/new" isPrimary={true}>
            新規登録
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          {data.stockCollection.items.map((article: { id: string; title: string }) => (
            <ArticleCard
              key={article.id}
              articleId={article.id}
              articleTitle={article.title}
              href={`/articles/${article.id}`}
            ></ArticleCard>
          ))}
        </div>
      </div>
    </div>
  )
}
