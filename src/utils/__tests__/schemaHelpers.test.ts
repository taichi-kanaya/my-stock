import { describe, it, expect } from 'vitest'
import { z } from 'zod'
import { zIntInRange, zLimitedText } from '../schemaHelpers'

describe('zIntInRange関数', () => {
  const schema = zIntInRange('テスト', 1, 10)

  it('範囲内の数値を解析できる', () => {
    expect(schema.parse('5')).toBe(5)
  })

  it('範囲外の数値は失敗する', () => {
    const result = schema.safeParse('0')
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.flatten().fieldErrors['']).toBeUndefined()
    }
  })
})

describe('zLimitedText関数', () => {
  const schema = zLimitedText('名前', 5)

  it('空でない文字列を解析できる', () => {
    expect(schema.parse('abc')).toBe('abc')
  })

  it('空文字列は失敗する', () => {
    const result = schema.safeParse('')
    expect(result.success).toBe(false)
  })
})
