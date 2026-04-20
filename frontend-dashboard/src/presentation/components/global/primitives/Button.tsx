import { ButtonHTMLAttributes, forwardRef } from "react";
import { Loading } from "./Loading";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "gradient" | "outline" | "secondary" | "danger";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      isLoading,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    // El sistema de diseño base está en globals.css
    const variantClasses = {
      primary: "btn-primary",
      gradient: "btn-gradient",
      outline: "btn-outline",
      secondary: "btn-secondary bg-muted text-foreground hover:bg-muted/80",
      danger: "btn-danger bg-red-700 text-white hover:bg-red-800",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`btn flex justify-center items-center gap-2 ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {isLoading ? <Loading message="" /> : children}
      </button>
    );
  },
);

Button.displayName = "Button";
