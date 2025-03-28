'use server'

import { ArticleFormData } from '@/features/articles/types'
import schema from '@/features/articles/validations/schema'
import getCMAEnv from '@/lib/getCMAEnv'

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
    const env = await getCMAEnv()

    // Contentfulにコンテンツを登録する
    const entry = await env.createEntry(process.env.CONTENTFUL_CONTENT_TYPE_ID!, {
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
    await entry.publish()

    console.info('Content registered successfully:', entry)
    return { isSuccess: true }
  } catch (error) {
    console.error('Error registering content:', error)
    return { isSuccess: false }
  }
}
