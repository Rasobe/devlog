import { InputHTMLAttributes, forwardRef, useState } from "react";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, type = "text", id, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    // Si es tipo 'password', el botón ajusta su visibilidad real
    const isPasswordField = type === "password";

    let inputType = type;
    if (isPasswordField) {
      inputType = showPassword ? "text" : "password";
    }

    // Si no pasan un id, tratamos de usar 'name' como alternativa accesible
    const inputId = id || props.name;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className="form-label font-medium text-sm">
            {label}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            className={`form-input rounded-md border w-full px-3 py-2 transition-colors ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 dark:border-white/10"
            } ${isPasswordField ? "pr-10" : ""} ${className || ""}`}
            {...props}
          />

          {isPasswordField && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                // Ojo cerrado (Eye Off)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              ) : (
                // Ojo abierto (Eye)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              )}
            </button>
          )}
        </div>

        {error && (
          <span className="text-xs font-medium text-red-500 animate-in fade-in">
            {error}
          </span>
        )}
      </div>
    );
  },
);

TextField.displayName = "TextField";
