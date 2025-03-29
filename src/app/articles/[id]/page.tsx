import { format } from 'date-fns'
import { notFound } from 'next/navigation'

import Loading from '@/app/loading'
import getSingleArticle from '@/features/articles/actions/getSingleArticle'
import Detail from '@/features/articles/components/Detail'

export default async function Page({ params }: { params: { id: string } }) {
  // 記事を取得する
  const { loading, error, data } = await getSingleArticle(parseInt(params.id))
  if (loading) return <Loading />
  if (error) {
    console.error(error)
    throw new Error('Failed to retrieve the article.')
  }

  // 記事が見つからない場合は404エラーを返す
  if (data.stockCollection.items.length === 0) {
    notFound()
  }

  // 記事を取得
  const article = data.stockCollection.items[0]

  // 公開日をフォーマット
  const formattedDate = format(new Date(article.publicAt), 'yyyy/MM/dd')

  // 記事本文を取得
  const articleBody = article.body.json.content[0].content[0].value

  return (
    <Detail
      entryId={String(article.sys.id)}
      id={String(article.id)}
      title={String(article.title)}
      body={articleBody}
      publicAt={formattedDate}
      views={String(article.views)}
    />
  )
}
