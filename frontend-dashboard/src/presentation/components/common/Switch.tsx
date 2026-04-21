"use client";

import { forwardRef } from "react";

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, disabled, className, ...props }, ref) => {
    return (
      <div className="flex items-center gap-3">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="peer sr-only"
            ref={ref}
            disabled={disabled}
            {...props}
          />
          <div
            className={`h-6 w-11 rounded-full bg-muted transition-colors peer-checked:bg-primary peer-focus:ring-2 peer-focus:ring-ring/50 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:after:translate-x-full ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className ?? ""}`}
          />
        </label>
        {label && (
          <span className="text-sm font-medium text-foreground">{label}</span>
        )}
      </div>
    );
  },
);

Switch.displayName = "Switch";
