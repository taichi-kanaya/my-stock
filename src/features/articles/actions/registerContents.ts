'use server'

import * as contentful from 'contentful-management'

import { ArticleFormData } from '@/features/articles/types'
import schema from '@/features/articles/validations/schema'

export type RegisterContentsResult =
  | { isSuccess: true }
  | {
      isSuccess: false
      fieldErrors?: Partial<Record<keyof ArticleFormData, string>>
    }

export async function registerContents(data: ArticleFormData): Promise<RegisterContentsResult> {
  try {
    const parseResult = schema.safeParse(data)
    if (!parseResult.success) {
      const zodErrors = parseResult.error.flatten().fieldErrors
      const fieldErrors: Partial<Record<keyof ArticleFormData, string>> = {}

      for (const key in zodErrors) {
        const field = key as keyof ArticleFormData
        fieldErrors[field] = zodErrors[field]?.[0] || '不正な値です'
      }

      return {
        isSuccess: false,
        fieldErrors,
      }
    }

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

    console.info('Content registered successfully:', cfEntry)
    return { isSuccess: true }
  } catch (error) {
    console.error('Error registering content:', error)
    return { isSuccess: false }
  }
}
