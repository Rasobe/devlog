// useTextField.ts
import { useState, useRef, useCallback, useImperativeHandle, useEffect } from "react";
import { useCharCount } from "@/presentation/hooks/useCharCount";

interface UseTextFieldProps {
  type: string;
  ref: React.ForwardedRef<HTMLInputElement>;
  value?: React.InputHTMLAttributes<HTMLInputElement>["value"];
  defaultValue?: React.InputHTMLAttributes<HTMLInputElement>["defaultValue"];
  onChange?: React.InputHTMLAttributes<HTMLInputElement>["onChange"];
}

export const useTextField = ({
  type,
  ref,
  value,
  defaultValue,
  onChange,
}: UseTextFieldProps) => {
  const [showPasswordValue, setShowPasswordValue] = useState(false);
  const internalRef = useRef<HTMLInputElement | null>(null);

  const isPasswordField = type === "password";
  const inputType = isPasswordField
    ? showPasswordValue
      ? "text"
      : "password"
    : type;

  const { charCount, updateCount, handleChange } = useCharCount({
    value,
    defaultValue,
  });

  useEffect(() => {
    if (internalRef.current) {
      updateCount(internalRef.current);
    }
  }, [updateCount, value]);

  useImperativeHandle(ref, () => internalRef.current!);

  const handleRef = useCallback(
    (node: HTMLInputElement | null) => {
      internalRef.current = node;
      updateCount(node);
    },
    [updateCount],
  );

  return {
    showPassword: {
      value: showPasswordValue,
      toggle: () => setShowPasswordValue((prev) => !prev),
    },
    charCount,
    handleRef,
    handleChange: handleChange(
      onChange as React.ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
      >,
    ),
    isPasswordField,
    inputType,
  };
};
