import { contentfulClient } from "@/app/lib/apollo-client.server";
import { ARTICLE_QUERIES } from "@/app/lib/graphql/queries.server";

export default async function getArticle(articleId: number) {
  const { loading, error, data } = await contentfulClient.query({
    query: ARTICLE_QUERIES.SINGLE_ARTICLE,
    variables: { id: articleId },
  });

  return { loading, error, data };
}
