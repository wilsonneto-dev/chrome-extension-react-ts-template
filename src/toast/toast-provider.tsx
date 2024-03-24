// ToastProvider.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type ToastType = 'success' | 'error';
type Toast = { id: number; type: ToastType; message: string };
type ToastContextType = { showToast: (message: string, type: ToastType) => void };

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let id = 0;

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType) => {
    const newToast: Toast = { id: ++id, type, message };
    setToasts((currentToasts) => [...currentToasts, newToast]);

    // Automatically remove the toast after 5 seconds
    setTimeout(() => {
      setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== newToast.id));
    }, 5000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Container */}
      <div style={{ position: 'fixed', top: 20, right: 20 }}>
        {toasts.map((toast) => (
          <div key={toast.id} style={{ margin: '10px', padding: '10px', border: `2px solid ${toast.type === 'error' ? 'red' : 'green'}` }}>
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
