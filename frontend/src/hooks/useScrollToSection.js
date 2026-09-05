import { useCallback } from 'react'

export function useScrollToSection() {
  return useCallback((selector) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
  }, [])
}
