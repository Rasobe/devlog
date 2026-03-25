"use client";

import { useLoginForm } from "./useLoginForm";
import { TextField } from "@/shared/components/ui/TextField";

export const LoginForm = () => {
  // Extraemos también el estado del formulario para los errores y el loading
  const { loginForm, onSubmit, isLoading, serverError } = useLoginForm();
  const {
    register,
    formState: { errors },
  } = loginForm;

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-6">
      {/* Grupo Email */}
      <TextField
        id="email"
        label="Email"
        type="email"
        placeholder="admin@devlog.local"
        error={errors.email?.message}
        {...register("email")}
      />

      {/* Grupo Password con la variante de ver contraseña */}
      <TextField
        id="password"
        label="Password"
        type="password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register("password")}
      />

      {/* Alerta de Error del Servidor (Credenciales incorrectas) */}
      {serverError && (
        <div className="rounded-md bg-red-500/10 p-3 text-sm font-medium text-red-500 border border-red-500/20">
          {serverError}
        </div>
      )}

      {/* Botón de Submit con estado de carga */}
      <button
        type="submit"
        disabled={isLoading}
        className="btn btn-gradient mt-2 w-full py-3.5 text-base font-semibold flex justify-center items-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-5 w-5 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Iniciando...
          </>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
};
