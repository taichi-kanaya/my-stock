import { gql } from "@apollo/client";

export const ARTICLE_QUERIES = {
  ALL_ARTICLES: gql`
    query {
      allArticles {
        id
        title
        body
        public_at
        views
      }
    }
  `,
  SINGLE_ARTICLE: gql`
    query SingleArticle($id: ID!) {
      Article(id: $id) {
        id
        title
        body
        public_at
        views
      }
    }
  `,
};
