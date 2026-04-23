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
              "form-input h-10! flex items-center justify-between gap-2 pr-3 cursor-pointer text-left",
              isOpen && "ring-2 ring-ring/50 border-ring",
              error && "border-red-500 focus:ring-red-500",
              isDisabled && "opacity-50 cursor-not-allowed",
            )}
          >
            <span
              className={cn(
                "truncate",
                !selectedOption && "text-muted-foreground",
              )}
            >
              {selectedOption
                ? selectedOption.label
                : (placeholder ?? "Seleccionar...")}
            </span>
            <ChevronDown
              size={16}
              className={cn(
                "text-muted-foreground transition-transform duration-200",
                isOpen && "rotate-180",
              )}
            />
          </button>

          {isOpen && (
            <div className="absolute top-[calc(100%+6px)] left-0 w-full min-w-[160px] z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="bg-popover border border-border rounded-xl shadow-lg overflow-hidden py-1">
                <div className="max-h-[250px] overflow-y-auto scrollbar-slim">
                  {options.map((option) => {
                    const isSelected = option.value === value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleSelect(option.value)}
                        className={cn(
                          "w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors text-left",
                          isSelected
                            ? "bg-primary/20 text-primary font-medium"
                            : "text-foreground hover:bg-muted",
                        )}
                      >
                        <span className="truncate">{option.label}</span>
                        {isSelected && (
                          <Check size={14} className="shrink-0 ml-2" />
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
          <span className="text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
            {error}
          </span>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
