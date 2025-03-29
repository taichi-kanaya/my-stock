'use client'

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'

import { usePathname } from 'next/navigation'

type CursorWaitContextType = {
  setWait: Dispatch<SetStateAction<boolean>>
  isWaiting: boolean
}

const CursorWaitContext = createContext<CursorWaitContextType>({
  setWait: () => {},
  isWaiting: false,
})

export function useCursorWait() {
  return useContext(CursorWaitContext)
}

export function CursorWaitProvider({ children }: { children: ReactNode }) {
  const [isWaiting, setIsWaiting] = useState(false)
  const pathname = usePathname()

  // カーソルの切り替え
  useEffect(() => {
    document.body.style.cursor = isWaiting ? 'wait' : 'default'
  }, [isWaiting])

  // URLパスが変わるたびにカーソルをリセットする
  useEffect(() => {
    setIsWaiting(false)
  }, [pathname])

  return (
    <CursorWaitContext.Provider value={{ setWait: setIsWaiting, isWaiting }}>
      {children}
    </CursorWaitContext.Provider>
  )
}
