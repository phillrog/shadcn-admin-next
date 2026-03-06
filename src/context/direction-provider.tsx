'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { DirectionProvider as RdxDirProvider } from '@radix-ui/react-direction'
import { getCookie, setCookie, removeCookie } from '@/lib/cookies'

export type Direction = 'ltr' | 'rtl'

const DEFAULT_DIRECTION = 'ltr'
const DIRECTION_COOKIE_NAME = 'dir'
const DIRECTION_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

type DirectionProviderProps = {
  children: React.ReactNode
  defaultDirection?: Direction
}

type DirectionContextState = {
  dir: Direction
  setDir: (dir: Direction) => void
  resetDir: () => void
}

const initialState: DirectionContextState = {
  dir: DEFAULT_DIRECTION,
  setDir: () => null,
  resetDir: () => null,
}

const DirectionContext = createContext<DirectionContextState>(initialState)

export function DirectionProvider({
  children,
  defaultDirection = DEFAULT_DIRECTION,
}: DirectionProviderProps) {
  const [dir, _setDir] = useState<Direction>(
    () => (getCookie(DIRECTION_COOKIE_NAME) as Direction) || defaultDirection
  )

  useEffect(() => {
    const root = window.document.documentElement
    root.dir = dir
  }, [dir])

  const setDir = (dir: Direction) => {
    setCookie(DIRECTION_COOKIE_NAME, dir, DIRECTION_COOKIE_MAX_AGE)
    _setDir(dir)
  }

  const resetDir = () => {
    removeCookie(DIRECTION_COOKIE_NAME)
    _setDir(DEFAULT_DIRECTION)
  }

  const value = {
    dir,
    setDir,
    resetDir,
  }

  return (
    <DirectionContext.Provider value={value}>
      <RdxDirProvider dir={dir}>{children}</RdxDirProvider>
    </DirectionContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useDirection = () => {
  const context = useContext(DirectionContext)

  if (!context)
    throw new Error('useDirection must be used within a DirectionProvider')

  return context
}
