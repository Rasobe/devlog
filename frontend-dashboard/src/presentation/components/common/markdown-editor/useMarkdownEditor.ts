import { useRef } from "react";

interface UseMarkdownEditorProps {
  value: string;
  onChange?: (value: string) => void;
}

export const useMarkdownEditor = ({
  value,
  onChange,
}: UseMarkdownEditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertMarkdown = (prefix: string, suffix: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.slice(start, end);
    const newValue =
      value.slice(0, start) + prefix + selected + suffix + value.slice(end);

    onChange?.(newValue);

    // Restaurar el foco y la selección
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };
  return { textareaRef, insertMarkdown };
};
