import { describe, expect, it, vi, beforeEach, afterAll } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Detail from '@/features/articles/components/Detail'
import { useCursorWait } from '@/components/provider/CursorWaitProvider'
import { deleteContents } from '@/features/articles/actions/deleteContents'

vi.mock('@/components/provider/CursorWaitProvider', () => ({
  useCursorWait: vi.fn()
}))

vi.mock('@/features/articles/actions/deleteContents', () => ({
  deleteContents: vi.fn()
}))

// Store the original window.confirm
const originalConfirm = window.confirm

describe('Detail Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    const mockSetWait = vi.fn()
    ;(useCursorWait as any).mockReturnValue({
      setWait: mockSetWait,
      isWaiting: false
    })
    
    window.confirm = vi.fn()
  })
  
  afterAll(() => {
    window.confirm = originalConfirm
  })

  it('should render article details correctly', () => {
    const props = {
      entryId: 'entry-123',
      id: '123',
      title: 'Test Article',
      body: 'This is a test article body',
      publicAt: '2023-01-01',
      views: '100'
    }
    
    render(<Detail {...props} />)
    
    expect(screen.getByText(props.title)).toBeInTheDocument()
    expect(screen.getByText(`公開日: ${props.publicAt}`)).toBeInTheDocument()
    expect(screen.getByText(props.body)).toBeInTheDocument()
    expect(screen.getByText(`この記事は ${props.views} 名の方に閲覧されています`)).toBeInTheDocument()
    
    expect(screen.getByText('編集する')).toBeInTheDocument()
    expect(screen.getByText('削除する')).toBeInTheDocument()
    expect(screen.getByText('トップへ戻る')).toBeInTheDocument()
  })

  it.skip('should handle delete button click with confirmation', () => {
    const props = {
      entryId: 'entry-123',
      id: '123',
      title: 'Test Article',
      body: 'This is a test article body',
      publicAt: '2023-01-01',
      views: '100'
    }
    
    ;(window.confirm as any).mockReturnValue(true)
    
    render(<Detail {...props} />)
    
    fireEvent.click(screen.getByText('削除する'))
    
    expect(window.confirm).toHaveBeenCalledWith('削除してよろしいですか？')
    
    const mockSetWait = useCursorWait().setWait
    expect(mockSetWait).toHaveBeenCalledWith(true)
  })

  it.skip('should not proceed with deletion if user cancels', () => {
    const props = {
      entryId: 'entry-123',
      id: '123',
      title: 'Test Article',
      body: 'This is a test article body',
      publicAt: '2023-01-01',
      views: '100'
    }
    
    ;(window.confirm as any).mockReturnValue(false)
    
    render(<Detail {...props} />)
    
    const deleteButton = screen.getByText('削除する')
    const mockPreventDefault = vi.fn()
    
    fireEvent.click(deleteButton, {
      preventDefault: mockPreventDefault
    })
    
    expect(window.confirm).toHaveBeenCalledWith('削除してよろしいですか？')
    
    expect(mockPreventDefault).toHaveBeenCalled()
  })
})
