import { format } from 'date-fns'
import { notFound } from 'next/navigation'

import Loading from '@/app/loading'
import Button from '@/components/basic/Button'
import Link from '@/components/basic/Link'
import LocalHeader from '@/components/layout/LocalHeader'
import getSingleArticle from '@/features/articles/actions/getSingleArticle'

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
    <>
      <div className="container mx-auto mt-4 px-4">
        <div className="space-x-4 pb-4">
          <Button href={`/articles/edit/${params.id}`} isPrimary={true}>
            編集する
          </Button>
          <Button href={`/articles/delete/${params.id}`} isPrimary={false}>
            削除する
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <LocalHeader>{article.title}</LocalHeader>
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
        <Link href="/">トップへ戻る</Link>
      </div>
    </>
  )
}
