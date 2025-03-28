'use server'

import { contentfulClient } from '@/lib/graphql/apolloClient'
import { GET_SINGLE_ARTICLE } from '@/lib/graphql/queries/articles'

export default async function getSingleArticle(articleId: number) {
  const { loading, error, data } = await contentfulClient.query({
    query: GET_SINGLE_ARTICLE,
    variables: { id: articleId },
    fetchPolicy: 'no-cache',
  })

  return { loading, error, data }
}
