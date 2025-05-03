import { describe, expect, it, vi, beforeEach } from 'vitest'
import { deleteContents } from '@/features/articles/actions/deleteContents'
import getCMAEnv from '@/lib/getCMAEnv'
import { redirect } from 'next/navigation'

vi.mock('@/lib/getCMAEnv', () => ({
  default: vi.fn()
}))

vi.mock('next/navigation', () => ({
  redirect: vi.fn()
}))

describe('deleteContents', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should successfully delete content', async () => {
    const mockFormData = new FormData()
    mockFormData.append('entryId', 'entry-123')
    
    const mockEntry = {
      unpublish: vi.fn().mockResolvedValue({}),
      delete: vi.fn().mockResolvedValue({})
    }
    
    const mockEnv = {
      getEntry: vi.fn().mockResolvedValue(mockEntry)
    }
    
    ;(getCMAEnv as any).mockResolvedValue(mockEnv)
    
    const consoleInfoSpy = vi.spyOn(console, 'info').mockImplementation(() => {})
    
    await deleteContents(mockFormData)
    
    expect(getCMAEnv).toHaveBeenCalled()
    
    expect(mockEnv.getEntry).toHaveBeenCalledWith('entry-123')
    
    expect(mockEntry.unpublish).toHaveBeenCalled()
    
    expect(mockEntry.delete).toHaveBeenCalled()
    
    expect(consoleInfoSpy).toHaveBeenCalledWith('Content deleted successfully:', mockEntry)
    
    expect(redirect).toHaveBeenCalledWith('/articles/complete?event=delete')
    
    consoleInfoSpy.mockRestore()
  })

  it('should handle errors during content deletion', async () => {
    const mockFormData = new FormData()
    mockFormData.append('entryId', 'entry-123')
    
    const mockError = new Error('Contentful API error')
    ;(getCMAEnv as any).mockRejectedValue(mockError)
    
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    await deleteContents(mockFormData)
    
    expect(getCMAEnv).toHaveBeenCalled()
    
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error deleting content:', mockError)
    
    expect(redirect).toHaveBeenCalledWith('/articles/complete?event=delete')
    
    consoleErrorSpy.mockRestore()
  })
})
