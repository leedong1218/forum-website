import { createContext, useContext, useState } from 'react';
import Loading from '@/components/common/Loading';

interface LoadingContextInterface {
  loading: boolean;
  setLoading: (status: boolean) => void;
}

const LoadingContext = createContext<LoadingContextInterface | null>(null);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const value = {
    loading,
    setLoading
  };

  return (
    <LoadingContext.Provider value={value}>
      {loading && <Loading/>}
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
}