import { ApolloClient, ApolloLink, DefaultOptions, HttpLink, InMemoryCache } from '@apollo/client'
import { print } from 'graphql/language/printer'

// GraphQLリクエストとレスポンスをコンソール出力するためのリンク
const consoleLogLink = new ApolloLink((operation, forward) => {
  console.info(
    `GraphQL Request: ${print(operation.query)}`,
    `Variables: ${JSON.stringify(operation.variables)}`,
  )
  return forward(operation).map((response) => {
    console.info(`GraphQL Response: ${operation.operationName}`, JSON.stringify(response.data))
    return response
  })
})

// GraphQL APIを使用するためのリンク
const httpLink = new HttpLink({
  uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT_ID}`,
  headers: {
    Authorization: `Bearer ${process.env.CDA_ACCESS_TOKEN}`,
  },
  fetchOptions: {
    cache: 'no-store',
  },
})

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

// Contentful の GraphQL Content API アクセス用クライアント
export const contentfulClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([consoleLogLink, httpLink]),
  defaultOptions: defaultOptions,
})
