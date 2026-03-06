'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export type Font = 'inter' | 'manrope' | 'roboto' | 'system'

const DEFAULT_FONT: Font = 'inter'
const FONT_COOKIE_NAME = 'font'
const FONT_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

type FontProviderProps = {
  children: React.ReactNode
  defaultFont?: Font
}

type FontProviderState = {
  font: Font
  setFont: (font: Font) => void
  resetFont: () => void
}

const initialState: FontProviderState = {
  font: DEFAULT_FONT,
  setFont: () => null,
  resetFont: () => null,
}

const FontContext = createContext<FontProviderState>(initialState)

export function FontProvider({
  children,
  defaultFont = DEFAULT_FONT,
  ...props
}: FontProviderProps) {
  const [font, _setFont] = useState<Font>(defaultFont)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('font-inter', 'font-manrope', 'font-roboto')
    if (font !== 'system') {
      root.classList.add(`font-${font}`)
    }
  }, [font])

  const setFont = (font: Font) => {
    _setFont(font)
  }

  const resetFont = () => {
    _setFont(DEFAULT_FONT)
  }

  const value = {
    font,
    setFont,
    resetFont,
  }

  return (
    <FontContext.Provider value={value} {...props}>
      {children}
    </FontContext.Provider>
  )
}

export const useFont = () => {
  const context = useContext(FontContext)

  if (!context)
    throw new Error('useFont must be used within a FontProvider')

  return context
}
