'use server'

import { redirect } from 'next/navigation'

import getCMAEnv from '@/lib/getCMAEnv'

export async function deleteContents(formData: FormData) {
  try {
    // Contentfulの環境情報を取得する
    const env = await getCMAEnv()

    // 既存エントリーを取得
    const entry = await env.getEntry(formData.get('entryId') as string)

    // エントリー公開解除
    await entry.unpublish()

    // エントリー削除
    await entry.delete()

    console.info('Content deleted successfully:', entry)
  } catch (error) {
    console.error('Error deleting content:', error)
  }

  redirect('/articles/complete?event=delete')
}
