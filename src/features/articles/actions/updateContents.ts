'use server'

import * as contentful from 'contentful-management'

import { ArticleFormData } from '@/features/articles/types'
import schema from '@/features/articles/validations/schema'

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
    const client = contentful.createClient({
      accessToken: process.env.CMA_ACCESS_TOKEN!,
    })
    const cfSpace = await client.getSpace(process.env.CONTENTFUL_SPACE_ID!)
    const cfEnvironment = await cfSpace.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT_ID!)

    // 既存エントリーを取得
    const cfEntry = await cfEnvironment.getEntry(data.entryId)

    // エントリー更新
    cfEntry.fields.title['ja-JP'] = data.title
    cfEntry.fields.body['ja-JP'].content[0].content[0].value = data.body
    cfEntry.fields.public_at['ja-JP'] = data.publicAt
    cfEntry.fields.views['ja-JP'] = Number(data.views)
    const updatedEntry = await cfEntry.update()

    // エントリー公開
    await updatedEntry.publish()

    console.info('Content updated successfully:', cfEntry)
    return { isSuccess: true }
  } catch (error) {
    console.error('Error updating content:', error)
    return { isSuccess: false }
  }
}
