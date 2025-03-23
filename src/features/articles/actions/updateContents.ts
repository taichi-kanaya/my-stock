'use server'

import * as contentful from 'contentful-management'

import { ArticleFormData } from '@/features/articles/types'

export async function updateContents(data: ArticleFormData): Promise<boolean> {
  try {
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

    // eslint-disable-next-line no-console
    console.log('Content updated successfully:', cfEntry)
    return true
  } catch (error) {
    console.error('Error updating content:', error)
    return false
  }
}
