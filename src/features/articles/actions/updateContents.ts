'use server'

import { ArticleFormData } from '@/features/articles/types'
import schema from '@/features/articles/validations/schema'
import getCMAEnv from '@/lib/getCMAEnv'

export type UpdateContentsResult =
  | { isSuccess: true }
  | {
      isSuccess: false
      fieldErrors?: Partial<Record<keyof ArticleFormData, string>>
    }

export async function updateContents(data: ArticleFormData): Promise<UpdateContentsResult> {
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

    // 既存エントリーを取得
    const entry = await env.getEntry(data.entryId)

    // エントリー更新
    entry.fields.title['ja-JP'] = data.title
    entry.fields.body['ja-JP'].content[0].content[0].value = data.body
    entry.fields.public_at['ja-JP'] = data.publicAt
    entry.fields.views['ja-JP'] = Number(data.views)
    const updatedEntry = await entry.update()

    // エントリー公開
    await updatedEntry.publish()

    console.info('Content updated successfully:', entry)
    return { isSuccess: true }
  } catch (error) {
    console.error('Error updating content:', error)
    return { isSuccess: false }
  }
}
