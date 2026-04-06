import { TextareaHTMLAttributes, forwardRef } from "react";

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, id, className, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className="form-label font-medium text-sm">
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={inputId}
          className={`form-input rounded-md border w-full px-3 py-2 transition-colors resize-y min-h-[120px] ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 dark:border-white/10"
          } ${className || ""} ${
            props.readOnly
              ? "bg-muted/50 cursor-not-allowed focus:ring-0"
              : ""
          }`}
          {...props}
        />

        {error && (
          <span className="text-xs font-medium text-red-500 animate-in fade-in">
            {error}
          </span>
        )}
      </div>
    );
  },
);

TextArea.displayName = "TextArea";

