import { describe, expect, it } from 'vitest'
import { zIntInRange, zLimitedText } from '@/utils/schemaHelpers'

describe('Schema Helpers', () => {
  describe('zIntInRange', () => {
    it('should validate integers within range', () => {
      const validator = zIntInRange('Test', 1, 100)
      
      expect(validator.safeParse('1').success).toBe(true)
      expect(validator.safeParse('50').success).toBe(true)
      expect(validator.safeParse('100').success).toBe(true)
      
      expect(validator.safeParse('0').success).toBe(false) // Below min
      expect(validator.safeParse('101').success).toBe(false) // Above max
      expect(validator.safeParse('abc').success).toBe(false) // Not a number
      expect(validator.safeParse('1.5').success).toBe(false) // Not an integer
    })
    
    it('should provide correct error messages', () => {
      const validator = zIntInRange('Test', 1, 100)
      
      const belowMinResult = validator.safeParse('0')
      expect(belowMinResult.success).toBe(false)
      if (!belowMinResult.success) {
        expect(belowMinResult.error.errors[0].message).toBe('Testは1以上で入力してください')
      }
      
      const aboveMaxResult = validator.safeParse('101')
      expect(aboveMaxResult.success).toBe(false)
      if (!aboveMaxResult.success) {
        expect(aboveMaxResult.error.errors[0].message).toBe('Testは100以下で入力してください')
      }
      
      const notNumberResult = validator.safeParse('abc')
      expect(notNumberResult.success).toBe(false)
      if (!notNumberResult.success) {
        expect(notNumberResult.error.errors[0].message).toBe('Testは整数で入力してください')
      }
    })
  })
  
  describe('zLimitedText', () => {
    it('should validate text within length limits', () => {
      const validator = zLimitedText('Test', 10)
      
      expect(validator.safeParse('Hello').success).toBe(true)
      expect(validator.safeParse('1234567890').success).toBe(true) // Max length
      
      expect(validator.safeParse('').success).toBe(false) // Empty
      expect(validator.safeParse('12345678901').success).toBe(false) // Too long
    })
    
    it('should provide correct error messages', () => {
      const validator = zLimitedText('Test', 10)
      
      const emptyResult = validator.safeParse('')
      expect(emptyResult.success).toBe(false)
      if (!emptyResult.success) {
        expect(emptyResult.error.errors[0].message).toBe('Testは必須項目です')
      }
      
      const tooLongResult = validator.safeParse('12345678901') // 11 chars
      expect(tooLongResult.success).toBe(false)
      if (!tooLongResult.success) {
        expect(tooLongResult.error.errors[0].message).toBe('Testは10文字以内で入力してください')
      }
    })
  })
})
