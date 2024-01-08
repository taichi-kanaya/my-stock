import { gql } from '@apollo/client';

export const ALL_ARTICLES_QUERY = gql`
  query {
    allArticles {
      id
      title
    }
  }
`;

export const SINGLE_ARTICLE_QUERY = gql`
  query SingleArticle($id: ID!) {
    article(id: $id) {
      id
      title
      content
    }
  }
`;