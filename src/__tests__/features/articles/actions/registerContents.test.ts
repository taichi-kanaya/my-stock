import { describe, expect, it, vi, beforeEach } from 'vitest'
import { registerContents } from '@/features/articles/actions/registerContents'
import schema from '@/features/articles/validations/schema'
import getCMAEnv from '@/lib/getCMAEnv'

vi.mock('@/features/articles/validations/schema', () => ({
  default: {
    safeParse: vi.fn()
  }
}))

vi.mock('@/lib/getCMAEnv', () => ({
  default: vi.fn()
}))

describe('registerContents', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should successfully register content when validation passes', async () => {
    const mockData = {
      id: '123',
      title: 'Test Article',
      body: 'Test content',
      publicAt: new Date('2023-01-01'),
      views: '100'
    }
    
    ;(schema.safeParse as any).mockReturnValue({
      success: true,
      data: mockData
    })
    
    const mockEntry = {
      publish: vi.fn().mockResolvedValue({}),
    }
    
    const mockEnv = {
      createEntry: vi.fn().mockResolvedValue(mockEntry)
    }
    
    ;(getCMAEnv as any).mockResolvedValue(mockEnv)
    
    const originalEnv = process.env
    process.env = {
      ...originalEnv,
      CONTENTFUL_CONTENT_TYPE_ID: 'stock'
    }
    
    const result = await registerContents(mockData as any)
    
    process.env = originalEnv
    
    expect(schema.safeParse).toHaveBeenCalledWith(mockData)
    
    expect(getCMAEnv).toHaveBeenCalled()
    
    expect(mockEnv.createEntry).toHaveBeenCalledWith('stock', {
      fields: {
        id: { 'ja-JP': Number(mockData.id) },
        title: { 'ja-JP': mockData.title },
        body: {
          'ja-JP': {
            nodeType: 'document',
            data: {},
            content: [
              {
                nodeType: 'paragraph',
                content: [
                  {
                    nodeType: 'text',
                    value: mockData.body,
                    data: {},
                    marks: [],
                  },
                ],
                data: {},
              },
            ],
          },
        },
        public_at: { 'ja-JP': mockData.publicAt },
        views: { 'ja-JP': Number(mockData.views) },
      },
    })
    
    expect(mockEntry.publish).toHaveBeenCalled()
    
    expect(result).toEqual({ isSuccess: true })
  })

  it('should return validation errors when validation fails', async () => {
    const mockData = {
      id: '0', // Invalid ID
      title: 'Test Article',
      body: 'Test content',
      publicAt: new Date('2023-01-01'),
      views: '100'
    }
    
    const mockErrors = {
      fieldErrors: {
        id: ['IDは1以上で入力してください']
      }
    }
    
    ;(schema.safeParse as any).mockReturnValue({
      success: false,
      error: {
        flatten: () => mockErrors
      }
    })
    
    const result = await registerContents(mockData as any)
    
    expect(schema.safeParse).toHaveBeenCalledWith(mockData)
    
    expect(getCMAEnv).not.toHaveBeenCalled()
    
    expect(result).toEqual({
      isSuccess: false,
      fieldErrors: {
        id: 'IDは1以上で入力してください'
      }
    })
  })

  it('should handle errors during content registration', async () => {
    const mockData = {
      id: '123',
      title: 'Test Article',
      body: 'Test content',
      publicAt: new Date('2023-01-01'),
      views: '100'
    }
    
    ;(schema.safeParse as any).mockReturnValue({
      success: true,
      data: mockData
    })
    
    const mockError = new Error('Contentful API error')
    ;(getCMAEnv as any).mockRejectedValue(mockError)
    
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    const result = await registerContents(mockData as any)
    
    expect(schema.safeParse).toHaveBeenCalledWith(mockData)
    
    expect(getCMAEnv).toHaveBeenCalled()
    
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error registering content:', mockError)
    
    expect(result).toEqual({ isSuccess: false })
    
    consoleErrorSpy.mockRestore()
  })
})
