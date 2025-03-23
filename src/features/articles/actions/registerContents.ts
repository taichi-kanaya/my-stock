'use server'

import * as contentful from 'contentful-management'

import { ArticleFormData } from '@/features/articles/types'

export async function registerContents(data: ArticleFormData): Promise<boolean> {
  try {
    // Contentfulの環境情報を取得する
    const client = contentful.createClient({
      accessToken: process.env.CMA_ACCESS_TOKEN!,
    })
    const cfSpace = await client.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const cfEnvironment = await cfSpace.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT_ID!)

    // Contentfulにコンテンツを登録する
    const cfEntry = await cfEnvironment.createEntry(process.env.CONTENTFUL_CONTENT_TYPE_ID!, {
      fields: {
        id: {
          'ja-JP': Number(data.id),
        },
        title: {
          'ja-JP': data.title,
        },
        body: {
          'ja-JP': {
            nodeType: 'document',
            data: {},
            content: [
              {
                nodeType: 'paragraph',
                content: [
                  {
                    nodeType: 'text',
                    value: data.body,
                    data: {},
                    marks: [],
                  },
                ],
                data: {},
              },
            ],
          },
        },
        public_at: {
          'ja-JP': data.publicAt,
        },
        views: {
          'ja-JP': Number(data.views),
        },
      },
    })

    // 記事を公開する
    await cfEntry.publish()

    // eslint-disable-next-line no-console
    console.info('Content registered successfully:', cfEntry)
    return true
  } catch (error) {
    console.error('Error registering content:', error)
    return false
  }
}
