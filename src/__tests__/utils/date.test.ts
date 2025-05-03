import { describe, expect, it, vi, beforeEach } from 'vitest'
import { isValidDate, convertToIsoUtc } from '@/utils/date'
import { formatISO, parse } from 'date-fns'

vi.mock('date-fns', () => ({
  formatISO: vi.fn(),
  parse: vi.fn()
}))

describe('Date Utils', () => {
  describe('isValidDate', () => {
    it('should return true for valid date strings', () => {
      expect(isValidDate('2023-01-01')).toBe(true)
      expect(isValidDate('2023/01/01')).toBe(true)
      expect(isValidDate(new Date().toISOString())).toBe(true)
    })
    
    it('should return false for invalid date strings', () => {
      expect(isValidDate('invalid-date')).toBe(false)
      expect(isValidDate('2023-13-01')).toBe(false) // Invalid month
      expect(isValidDate('')).toBe(false)
    })
  })
  
  describe('convertToIsoUtc', () => {
    beforeEach(() => {
      vi.clearAllMocks()
    })
    
    it('should convert date string to ISO UTC format', () => {
      const mockDate = new Date('2023-01-01T00:00:00.000Z')
      const mockIsoString = '2023-01-01T00:00:00.000Z'
      
      ;(parse as any).mockReturnValue(mockDate)
      ;(formatISO as any).mockReturnValue(mockIsoString)
      
      const result = convertToIsoUtc('20230101')
      
      expect(parse).toHaveBeenCalledWith('20230101', 'yyyyMMdd', expect.any(Date))
      
      expect(formatISO).toHaveBeenCalledWith(mockDate, { representation: 'complete' })
      
      expect(result).toBe(mockIsoString)
    })
    
    it('should use custom format when provided', () => {
      const mockDate = new Date('2023-01-01T00:00:00.000Z')
      const mockIsoString = '2023-01-01T00:00:00.000Z'
      
      ;(parse as any).mockReturnValue(mockDate)
      ;(formatISO as any).mockReturnValue(mockIsoString)
      
      const result = convertToIsoUtc('01/01/2023', 'MM/dd/yyyy')
      
      expect(parse).toHaveBeenCalledWith('01/01/2023', 'MM/dd/yyyy', expect.any(Date))
      
      expect(formatISO).toHaveBeenCalledWith(mockDate, { representation: 'complete' })
      
      expect(result).toBe(mockIsoString)
    })
  })
})
