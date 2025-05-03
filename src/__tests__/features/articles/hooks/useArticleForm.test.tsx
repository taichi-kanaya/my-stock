import { describe, expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import useArticleForm from '@/features/articles/hooks/useArticleForm'
import schema from '@/features/articles/validations/schema'

vi.mock('@/features/articles/validations/schema', () => {
  return {
    default: {
    }
  }
})

describe('useArticleForm', () => {
  it('should return a form with the correct configuration', () => {
    const { result } = renderHook(() => useArticleForm())
    
    expect(result.current).toHaveProperty('register')
    expect(result.current).toHaveProperty('handleSubmit')
    expect(result.current).toHaveProperty('formState')
    expect(result.current).toHaveProperty('control')
  })

  it('should initialize with default values when provided', () => {
    const defaultValues = {
      entryId: 'test-entry-id',
      id: '123',
      title: 'Test Title',
      body: 'Test Body',
      publicAt: new Date('2023-01-01'),
      views: '100'
    }
    
    const { result } = renderHook(() => useArticleForm(defaultValues))
    
    expect(result.current.getValues()).toEqual(defaultValues)
  })
})
