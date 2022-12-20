import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { type ToastTypeFn, Toast, ToastViewport } from 'components/Toast'

interface TToast {
  success: ToastTypeFn
  error: ToastTypeFn
}

const ImperativeToastContext = createContext<TToast | undefined>(undefined)

interface ToastProviderProps {
  duration?: number
  children: React.ReactNode
}

export const ToastProvider = ({
  duration = 5000,
  children
}: ToastProviderProps) => {
  const [toast, setToast] = useState<TToast>()
  const toastRef = useRef<TToast>()

  useEffect(() => {
    setToast(toastRef.current)
  }, [])

  return (
    <ToastPrimitive.Provider duration={duration}>
      <ImperativeToastContext.Provider value={toast}>
        {children}
      </ImperativeToastContext.Provider>

      <Toast ref={toastRef} />
      <ToastViewport />
    </ToastPrimitive.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ImperativeToastContext)
  if (!context) return {} as TToast
  return context
}
