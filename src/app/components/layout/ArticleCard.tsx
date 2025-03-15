import React from 'react'
import Link from 'next/link'

interface ArticleCardProps {
  articleId: string
  articleTitle: string
  href?: string
}

const ArticleCard: React.FC<ArticleCardProps> = ({ articleId, articleTitle, href = '#' }) => {
  return (
    <Link href={href} prefetch={false}>
      <div className="rounded-lg border bg-white p-4">
        <div className="px-1 py-4">
          <div className="mb-2 text-xl font-bold">{articleTitle}</div>
          <p className="text-base text-gray-700">ID: {articleId}</p>
        </div>
      </div>
    </Link>
  )
}

export default ArticleCard
