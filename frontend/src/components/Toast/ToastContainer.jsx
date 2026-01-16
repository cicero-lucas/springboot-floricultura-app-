import React, { useState, useCallback } from 'react';
import Toast from './Toast';

let toastId = 0;

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = ++toastId;
    const newToast = { id, message, type };
    
    setToasts(prev => [...prev, newToast]);
    
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // Expor função globalmente
  React.useEffect(() => {
    window.showToast = addToast;
  }, [addToast]);

  return (
    <div>
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          style={{
            position: 'absolute',
            top: `${100 + index * 70}px`,
            right: '20px',
            zIndex: 1000 + index
          }}
        >
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;