'use server'

import { contentfulClient } from '@/lib/graphql/apolloClient'
import { GET_ALL_ARTICLES } from '@/lib/graphql/queries/articles'

export default async function getAllArticles() {
  const { loading, error, data } = await contentfulClient.query({
    query: GET_ALL_ARTICLES,
    fetchPolicy: 'no-cache',
  })

  return { loading, error, data }
}
