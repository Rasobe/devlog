"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useMarkdownEditor } from "./useMarkdownEditor";
import { TOOL_GROUPS } from "./MarkdownEditor.tools";

interface MarkdownEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  label?: string;
}

export const MarkdownEditor = ({
  value = "",
  onChange,
  error,
  label,
}: MarkdownEditorProps) => {
  const { textareaRef, insertMarkdown } = useMarkdownEditor({
    value,
    onChange,
  });

  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="form-label">{label}</label>}

      <div className="flex flex-col border border-border rounded-lg overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-1 px-3 py-2 border-b border-border bg-muted/40">
          {TOOL_GROUPS.map((group, index) => (
            <div key={group.title} className="flex items-center gap-0.5">
              {index > 0 && <div className="w-px h-4 bg-border mx-2" />}
              {group.tools.map((tool) => (
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
