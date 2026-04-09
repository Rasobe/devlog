import { useEffect, RefObject } from "react";

/**
 * Hook que activa un callback cuando se hace click fuera de los elementos referenciados.
 * @param refs Array de referencias a elementos.
 * @param handler Función a ejecutar al hacer click fuera.
 */
export const useClickOutside = (
  refs: (RefObject<HTMLElement | null> | null)[],
  handler: (event: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Si el click fue dentro de alguno de los elementos, no hacemos nada
      const isInside = refs.some((ref) => {
        return ref?.current && ref.current.contains(event.target as Node);
      });

      if (isInside) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [refs, handler]);
};
