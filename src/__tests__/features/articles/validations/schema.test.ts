import { describe, expect, it } from 'vitest'
import schema, { ID, VIEWS, MAX_LENGTHS } from '@/features/articles/validations/schema'

describe('Schema Validation', () => {
  it('should validate a valid article form data', () => {
    const validData = {
      id: '123',
      title: 'Test Title',
      body: 'Test Body Content',
      publicAt: new Date(),
      views: '100'
    }
    
    const result = schema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('should reject invalid ID', () => {
    const invalidData = {
      id: '0', // Below minimum
      title: 'Test Title',
      body: 'Test Body Content',
      publicAt: new Date(),
      views: '100'
    }
    
    const result = schema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.id).toBeDefined()
    }
  })

  it('should reject empty title', () => {
    const invalidData = {
      id: '123',
      title: '', // Empty title
      body: 'Test Body Content',
      publicAt: new Date(),
      views: '100'
    }
    
    const result = schema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.title).toBeDefined()
    }
  })

  it('should reject title exceeding max length', () => {
    const invalidData = {
      id: '123',
      title: 'A'.repeat(MAX_LENGTHS.TITLE + 1), // Exceeds max length
      body: 'Test Body Content',
      publicAt: new Date(),
      views: '100'
    }
    
    const result = schema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.title).toBeDefined()
    }
  })

  it('should reject body exceeding max length', () => {
    const invalidData = {
      id: '123',
      title: 'Test Title',
      body: 'A'.repeat(MAX_LENGTHS.BODY + 1), // Exceeds max length
      publicAt: new Date(),
      views: '100'
    }
    
    const result = schema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.body).toBeDefined()
    }
  })

  it('should reject invalid date', () => {
    const invalidData = {
      id: '123',
      title: 'Test Title',
      body: 'Test Body Content',
      publicAt: 'invalid-date', // Invalid date
      views: '100'
    }
    
    const result = schema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.publicAt).toBeDefined()
    }
  })

  it('should reject invalid views', () => {
    const invalidData = {
      id: '123',
      title: 'Test Title',
      body: 'Test Body Content',
      publicAt: new Date(),
      views: '0' // Below minimum
    }
    
    const result = schema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.views).toBeDefined()
    }
  })
})
