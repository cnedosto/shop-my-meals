import { useEffect, type RefObject } from 'react';

export const useOnClickOutside = (ref: RefObject<HTMLDivElement>, callback: any): void => {
  const handleClick: EventListener = (e: Event): void => {
    const target = e.target as HTMLDivElement;

    if (ref.current && !ref.current.contains(target)) {
      if (e instanceof MouseEvent) {
        callback(e);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};
