"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { useTextField } from "./useTextField";
import { EyeIcon, EyeOffIcon } from "./TextField.icons";
import { cn } from "@/core/utils/cn";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  width?: "full" | "auto";
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    { label, error, type = "text", id, className, width = "full", ...props },
    ref,
  ) => {
    const {
      showPassword,
      charCount,
      handleRef,
      handleChange,
      isPasswordField,
      inputType,
    } = useTextField({
      type,
      ref,
      value: props.value,
      defaultValue: props.defaultValue,
      onChange: props.onChange,
    });

    const inputId = id || props.name;

    return (
      <div
        className={cn("flex flex-col gap-1.5", width === "full" && "w-full")}
      >
        {label && (
          <label htmlFor={inputId} className="form-label font-medium text-sm">
            {label}
          </label>
        )}

        <div className="relative">
          <input
            ref={handleRef}
            id={inputId}
            type={inputType}
            className={cn(
              "form-input h-10! rounded-md border w-full px-3 py-2 transition-all duration-200",
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 dark:border-white/10",
              isPasswordField && "pr-10",
              props.readOnly && "bg-muted/50 cursor-not-allowed focus:ring-0",
              className,
            )}
            {...props}
            onChange={handleChange}
          />

          {isPasswordField && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={showPassword.toggle}
            >
              {showPassword.value ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          )}
        </div>

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

TextField.displayName = "TextField";
