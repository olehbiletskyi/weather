import { useCallback, useState } from 'react'

export const useIsOpenControl = () => {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((isOpen) => !isOpen), [])

  return { isOpen, open, close, toggle }
}
