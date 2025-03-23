'use server'

import { contentfulClient } from '@/lib/apolloClient'
import { GET_ALL_ARTICLES } from '@/lib/graphql/queries'

export default async function getAllArticles() {
  const { loading, error, data } = await contentfulClient.query({
    query: GET_ALL_ARTICLES,
    fetchPolicy: 'no-cache',
  })

  return { loading, error, data }
}
