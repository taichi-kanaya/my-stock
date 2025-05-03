import { describe, expect, it, vi } from 'vitest'
import getSingleArticle from '@/features/articles/actions/getSingleArticle'
import { contentfulClient } from '@/lib/graphql/apolloClient'
import { GET_SINGLE_ARTICLE } from '@/lib/graphql/queries/articles'

vi.mock('@/lib/graphql/apolloClient', () => ({
  contentfulClient: {
    query: vi.fn()
  }
}))

describe('getSingleArticle', () => {
  it('should fetch a single article by ID', async () => {
    const mockArticleId = 123
    const mockResponse = {
      loading: false,
      error: null,
      data: {
        stockCollection: {
          items: [
            {
              sys: { id: 'entry-123' },
              id: 123,
              title: 'Test Article',
              body: { json: { content: [{ content: [{ value: 'Test content' }] }] } },
              publicAt: '2023-01-01',
              views: 100
            }
          ]
        }
      }
    }
    
    ;(contentfulClient.query as any).mockResolvedValue(mockResponse)
    
    const result = await getSingleArticle(mockArticleId)
    
    expect(contentfulClient.query).toHaveBeenCalledWith({
      query: GET_SINGLE_ARTICLE,
      variables: { id: mockArticleId },
      fetchPolicy: 'no-cache'
    })
    
    expect(result).toEqual(mockResponse)
  })

  it('should handle errors when fetching an article', async () => {
    const mockArticleId = 999
    const mockError = new Error('Article not found')
    const mockResponse = {
      loading: false,
      error: mockError,
      data: null
    }
    
    ;(contentfulClient.query as any).mockResolvedValue(mockResponse)
    
    const result = await getSingleArticle(mockArticleId)
    
    expect(contentfulClient.query).toHaveBeenCalledWith({
      query: GET_SINGLE_ARTICLE,
      variables: { id: mockArticleId },
      fetchPolicy: 'no-cache'
    })
    
    expect(result.error).toEqual(mockError)
  })
})
