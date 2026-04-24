import { ButtonHTMLAttributes, forwardRef } from "react";
import { Loading } from "./Loading";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "gradient"
    | "outline"
    | "ghost"
    | "secondary"
    | "danger"
    | "danger-outline";
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
      ghost:
        "hover:bg-muted transition-colors text-muted-foreground hover:text-foreground",
      secondary: "btn-secondary bg-muted text-foreground hover:bg-muted/80",
      danger: "btn-danger bg-red-700 text-white hover:bg-red-800",
      "danger-outline":
        "border border-red-500/50 text-red-500 hover:bg-red-500/10 transition-colors",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`btn flex justify-center items-center gap-2 p-4 ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {isLoading ? <Loading message="" /> : children}
      </button>
    );
  },
);

Button.displayName = "Button";
