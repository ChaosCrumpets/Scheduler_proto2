import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === 'success';

  return (
    <div className={`fixed top-5 right-5 flex items-center p-4 rounded-lg shadow-lg text-white ${isSuccess ? 'bg-green-500' : 'bg-red-500'}`}>
      {isSuccess ? <CheckCircle className="h-5 w-5 mr-3" /> : <XCircle className="h-5 w-5 mr-3" />}
      <span>{message}</span>
    </div>
  );
};

export const useToast = () => {
    const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type });
    };

    const ToastComponent = toast ? <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} /> : null;

    return { showToast, ToastComponent };
};
