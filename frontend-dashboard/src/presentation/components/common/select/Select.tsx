"use client";

import { forwardRef } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/core/utils/cn";
import { useSelect } from "./useSelect";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  value?: string;
  label?: string;
  options: SelectOption[];
  error?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  placeholder?: string;
  width?: "full" | "auto";
  className?: string;
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      label,
      options,
      error,
      disabled,
      value,
      onChange,
      placeholder,
      width = "auto",
      className,
    },
    ref,
  ) => {
    const { isOpen, setIsOpen, selectedOption, handleSelect, containerRef } =
      useSelect({ value, onChange, options });

    const isDisabled = disabled || options.length === 0;

    return (
      <div
        ref={containerRef}
        className={cn(
          "flex flex-col gap-1.5",
          width === "full" ? "w-full" : "w-auto",
          className,
        )}
      >
        {label && <label className="form-label">{label}</label>}

        <div className="relative">
          <button
            ref={ref}
            type="button"
            disabled={isDisabled}
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "form-input h-10! flex items-center justify-between gap-2 pr-3 cursor-pointer text-left w-full",
              isOpen && "ring-2 ring-ring/50 border-ring",
              error && "border-red-500",
              isDisabled && "opacity-50 cursor-not-allowed",
            )}
          >
            <span
              className={cn(
                "truncate text-sm",
                !selectedOption && "text-muted-foreground",
              )}
            >
              {selectedOption
                ? selectedOption.label
                : (placeholder ?? "Seleccionar...")}
            </span>
            <ChevronDown
              size={15}
              className={cn(
                "text-muted-foreground shrink-0 transition-transform duration-200",
                isOpen && "rotate-180",
              )}
            />
          </button>

          {isOpen && (
            <div className="absolute top-[calc(100%+4px)] left-0 w-full min-w-[160px] z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="bg-background border border-border rounded-lg shadow-lg overflow-hidden py-1">
                <div className="max-h-60 overflow-y-auto scrollbar-slim">
                  {options.map((option) => {
                    const isSelected = option.value === value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleSelect(option.value)}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2 text-sm transition-colors text-left",
                          isSelected
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-foreground hover:bg-muted",
                        )}
                      >
                        <span className="truncate">{option.label}</span>
                        {isSelected && (
                          <Check
                            size={13}
                            className="shrink-0 ml-2 text-primary"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {error && (
          <span className="text-xs font-medium text-destructive animate-in fade-in">
            {error}
          </span>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
