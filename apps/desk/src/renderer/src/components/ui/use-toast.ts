// components/ui/use-toast.ts
import { Toast } from './toast'
import { useState } from 'react'

export function useToast() {
  const [toasts, setToasts] = useState([])

  function addToast(title, description) {
    setToasts([...toasts, { title, description }])
  }

  return { addToast, toasts }
}
