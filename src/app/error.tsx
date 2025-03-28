'use client'

import { useEffect } from 'react'

import Link from '@/components/basic/Link'

export default function Error({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="m-10 text-center">
      <h1>
        予期しないエラーが発生しました。 <br />
        恐れ入りますが、再度操作をお願いいたします。
      </h1>
      <div className="my-5">
        <Link href="/">トップへ戻る</Link>
      </div>
    </div>
  )
}
