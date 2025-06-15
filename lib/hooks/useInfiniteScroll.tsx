import { useCallback, useEffect, useRef } from "react";

interface UseInfiniteScrollProps {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
}

export const useInfiniteScroll = ({ hasMore, isLoading, onLoadMore }: UseInfiniteScrollProps) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const setupObserver = useCallback((node: HTMLDivElement | null) => {
    if (isLoading || !hasMore) return;
    
    if (observer.current) {
      observer.current.disconnect();
    }
    
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          onLoadMore();
        }
      },
      {
        rootMargin: '100px',
      }
    );
    
    if (node) {
      observer.current.observe(node);
    }
  }, [isLoading, hasMore, onLoadMore]);

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return { setupObserver };
};