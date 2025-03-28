import * as contentful from 'contentful-management'

// Content Management API実行用Environmentの取得
export default async function getCMAEnv() {
  const client = contentful.createClient({
    accessToken: process.env.CMA_ACCESS_TOKEN!,
  })
  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID!)
  return space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT_ID!)
}
