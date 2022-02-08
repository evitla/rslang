import { useEffect } from 'react';

const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  setIsOpen: (isOpen: boolean) => void
) => {
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current === null) return;

      const path = e.composedPath && e.composedPath();

      if (!path.includes(ref.current)) {
        setIsOpen(false);
      }
    };
    document.body.onclick = handleOutsideClick;
  }, [ref, setIsOpen]);
};

export default useClickOutside;
