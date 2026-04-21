import { useState, useCallback } from "react";

interface UseCharCountProps {
  value?: string | number | readonly string[];
  defaultValue?: string | number | readonly string[];
}

export const useCharCount = ({ value, defaultValue }: UseCharCountProps) => {
  const [internalCount, setInternalCount] = useState(
    String(defaultValue || value || "").length,
  );

  const charCount = value !== undefined ? String(value).length : internalCount;

  const updateCount = useCallback(
    (node: HTMLInputElement | HTMLTextAreaElement | null) => {
      if (node) setInternalCount(node.value.length);
    },
    [],
  );

  const handleChange =
    (
      onChange?: React.ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
      >,
    ) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (value === undefined) setInternalCount(e.target.value.length);
      onChange?.(e);
    };

  return { charCount, updateCount, handleChange };
};
