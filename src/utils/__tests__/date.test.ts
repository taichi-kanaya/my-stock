import { describe, it, expect } from 'vitest'
import { isValidDate, convertToIsoUtc } from '../date'

describe('isValidDate関数', () => {
  it('有効な日付文字列なら true を返す', () => {
    expect(isValidDate('2024-01-01')).toBe(true)
  })

  it('無効な日付文字列なら false を返す', () => {
    expect(isValidDate('invalid-date')).toBe(false)
  })
})

describe('convertToIsoUtc関数', () => {
  it('yyyymmdd 文字列を ISO UTC に変換する', () => {
    const iso = convertToIsoUtc('20240101')
    expect(iso.startsWith('2024-01-01T00:00:00')).toBe(true)
  })
})
