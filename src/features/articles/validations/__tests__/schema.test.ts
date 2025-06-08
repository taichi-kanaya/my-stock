import { describe, it, expect } from 'vitest'
import schema from '../schema'

describe('記事スキーマ', () => {
  it('正しいデータを検証できる', () => {
    const data = {
      entryId: '1',
      id: '1',
      title: 'title',
      body: 'body',
      publicAt: new Date('2024-01-01'),
      views: '10',
    }
    const result = schema.safeParse(data)
    expect(result.success).toBe(true)
  })

  it('idが範囲外の場合は失敗する', () => {
    const data = {
      id: '0',
      title: 't',
      body: 'b',
      publicAt: new Date('2024-01-01'),
      views: '1',
    }
    const result = schema.safeParse(data)
    expect(result.success).toBe(false)
  })
})
