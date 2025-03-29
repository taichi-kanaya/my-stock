import Link from '@/components/basic/Link'

export default async function Page({
  searchParams,
}: {
  searchParams: {
    event: 'register' | 'update'
  }
}) {
  const eventMessageMap = {
    register: '記事の登録が完了しました',
    update: '記事の更新が完了しました',
  } as const

  return (
    <div className="m-10 text-center">
      <div>{eventMessageMap[searchParams.event]}</div>
      <div className="my-5">
        <Link href="/">トップへ戻る</Link>
      </div>
    </div>
  )
}
