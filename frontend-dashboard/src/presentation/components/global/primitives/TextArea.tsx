"use client";

import {
  TextareaHTMLAttributes,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import { useCharCount } from "@/presentation/hooks/useCharCount";
import { cn } from "@/core/utils/cn";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, id, className, ...props }, ref) => {
    const inputId = id || props.name;
    const internalRef = useRef<HTMLTextAreaElement | null>(null);

    const { charCount, updateCount, handleChange } = useCharCount({
      value: props.value,
      defaultValue: props.defaultValue,
    });

    useImperativeHandle(ref, () => internalRef.current!);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className="form-label font-medium text-sm">
            {label}
          </label>
        )}

        <textarea
          ref={(node) => {
            internalRef.current = node;
            updateCount(node);
          }}
          id={inputId}
          className={cn(
            "form-input rounded-md border w-full px-3 py-2 transition-all duration-200 resize-y min-h-[120px]",
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 dark:border-white/10",
            props.readOnly && "bg-muted/50 cursor-not-allowed focus:ring-0",
            className,
          )}
          {...props}
          onChange={handleChange(
            props.onChange as React.ChangeEventHandler<HTMLTextAreaElement>,
          )}
        />

        {(error || props.maxLength) && (
          <div className="flex justify-between items-start mt-0.5">
            <span className="text-xs font-medium text-red-500 animate-in fade-in">
              {error}
            </span>
            {props.maxLength && (
              <span className="text-xs text-muted-foreground ml-auto pl-2 font-medium">
                {charCount} / {props.maxLength}
              </span>
            )}
          </div>
        )}
      </div>
    );
  },
);

TextArea.displayName = "TextArea";
