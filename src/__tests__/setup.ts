import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

afterEach(() => {
  cleanup()
})

try {
  if (typeof window !== 'undefined') {
    window.fetch = vi.fn()
  } else {
    global.fetch = vi.fn()
  }
} catch (e) {
  console.warn('Could not mock fetch', e)
}

try {
  process.env = {
    ...process.env,
    CONTENTFUL_SPACE_ID: 'mock-space-id',
    CONTENTFUL_ENVIRONMENT_ID: 'mock-environment-id',
    CONTENTFUL_CONTENT_TYPE_ID: 'stock',
    CMA_ACCESS_TOKEN: 'mock-cma-token',
    CDA_ACCESS_TOKEN: 'mock-cda-token'
  }
} catch (e) {
  console.warn('Could not mock process.env', e)
}

try {
  if (typeof window !== 'undefined') {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })
  }
} catch (e) {
  console.warn('Could not mock matchMedia', e)
}
