"use client";

import { useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Bold, Italic, Heading2, List, Code, Link } from "lucide-react";

interface MarkdownEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  label?: string;
}

const TOOLS = [
  { icon: <Bold size={14} />, prefix: "**", suffix: "**", title: "Negrita" },
  { icon: <Italic size={14} />, prefix: "_", suffix: "_", title: "Cursiva" },
  { icon: <Heading2 size={14} />, prefix: "## ", suffix: "", title: "Encabezado" },
  { icon: <List size={14} />, prefix: "- ", suffix: "", title: "Lista" },
  { icon: <Code size={14} />, prefix: "`", suffix: "`", title: "Código inline" },
  { icon: <Link size={14} />, prefix: "[", suffix: "](url)", title: "Enlace" },
];

export const MarkdownEditor = ({
  value = "",
  onChange,
  error,
  label,
}: MarkdownEditorProps) => {
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
      textarea.setSelectionRange(
        start + prefix.length,
        end + prefix.length
      );
    }, 0);
  };

  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="form-label">{label}</label>}

      <div className="flex flex-col border border-border rounded-lg overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-1 px-3 py-2 border-b border-border bg-muted/40">
          {TOOLS.map((tool) => (
            <button
              key={tool.title}
              type="button"
              title={tool.title}
              onClick={() => insertMarkdown(tool.prefix, tool.suffix)}
              className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              {tool.icon}
            </button>
          ))}
        </div>

        {/* Editor + Preview */}
        <div className="grid grid-cols-2 min-h-[400px]">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder="Escribe en markdown..."
            className="w-full h-full min-h-[400px] resize-none bg-background p-4 text-sm font-mono focus:outline-none border-r border-border"
          />

          <div className="p-4 overflow-y-auto prose prose-invert prose-sm max-w-none">
            {value ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
            ) : (
              <p className="text-muted-foreground text-sm">
                El preview aparecerá aquí...
              </p>
            )}
          </div>
        </div>
      </div>

      {error && (
        <span className="text-xs font-medium text-red-500">{error}</span>
      )}
    </div>
  );
};