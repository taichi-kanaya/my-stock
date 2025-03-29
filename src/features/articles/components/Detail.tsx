'use client'

import Button from '@/components/basic/Button'
import Hidden from '@/components/basic/Hidden'
import Link from '@/components/basic/Link'
import LocalHeader from '@/components/layout/LocalHeader'
import { useCursorWait } from '@/components/provider/CursorWaitProvider'
import { deleteContents } from '@/features/articles/actions/deleteContents'

type DetailProps = {
  entryId: string
  id: string
  title: string
  body: string
  publicAt: string
  views: string
}

const Detail: React.FC<DetailProps> = ({ entryId, id, title, body, publicAt, views }) => {
  const { setWait, isWaiting } = useCursorWait()

  const deleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const ok = confirm('削除してよろしいですか？')
    if (!ok) {
      e.preventDefault()
    }

    // Reactのイベントバッチングに巻き込まれてリダイレクトされない問題の抑止
    setTimeout(() => {
      setWait(true)
    }, 0)
  }

  return (
    <form action={deleteContents}>
      <Hidden id={'h-entry-id'} name="entryId" value={entryId} />
      <div className="container mx-auto mt-4 px-4">
        <div className="space-x-4 pb-4">
          <Button href={`/articles/edit/${id}`} isPrimary={true}>
            編集する
          </Button>
          <Button type="submit" onClick={deleteClick} isPrimary={false} disabled={isWaiting}>
            削除する
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <LocalHeader>{title}</LocalHeader>
          <p>公開日: {publicAt}</p>
          <div className="mt-2">
            <p>{body}</p>
          </div>
          <div className="mt-2 text-sm">
            <p>この記事は {views} 名の方に閲覧されています</p>
          </div>
        </div>
      </div>
      <div className="my-10 text-center">
        <Link href="/">トップへ戻る</Link>
      </div>
    </form>
  )
}

export default Detail
