import { gql } from '@apollo/client'

export const GET_ALL_ARTICLES = gql`
  query GetAllArticles {
    stockCollection(order: id_ASC) {
      items {
        id
        title
        body {
          json
        }
        publicAt
        views
      }
    }
  }
`

export const GET_SINGLE_ARTICLE = gql`
  query GetSingleArticle($id: Int!) {
    stockCollection(where: { id: $id }) {
      items {
        id
        title
        body {
          json
        }
        publicAt
        views
      }
    }
  }
`
