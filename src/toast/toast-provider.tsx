import {createContext, PropsWithChildren, useContext, useState} from 'react'
import Message, {MessageType} from "./models/message.ts"
import {ToastsWrapper} from "./components/toast/toast.tsx"

interface ToastContextType {
  showToast: (message: string, type: MessageType) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: PropsWithChildren) {
  const [toasts, setToasts] = useState<Message[]>([])

  const showToast = (message: string, type: MessageType) => {
    const newMessage: Message = new Message(message, type)
    setToasts((currentToasts) =>
      [...currentToasts, newMessage])

    setTimeout(() => {
      setToasts(currentToasts =>
        currentToasts.filter((toast) =>
          toast.id !== newMessage.id))
    }, 5000)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastsWrapper toasts={toasts} />
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
