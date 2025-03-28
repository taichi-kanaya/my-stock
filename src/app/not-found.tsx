import Link from '@/components/basic/Link'

export default function NotFound() {
  return (
    <div className="m-10 text-center">
      <h1>ページが存在しません</h1>
      <div className="my-5">
        <Link href="/">トップへ戻る</Link>
      </div>
    </div>
  )
}
