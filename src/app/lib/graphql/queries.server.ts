import { gql } from '@apollo/client'

export const ARTICLE_QUERIES = {
  ALL_ARTICLES: gql`
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
  `,
  SINGLE_ARTICLE: gql`
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
  `,
}
