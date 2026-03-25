"use client";

import { useLoginForm } from "./useLoginForm";

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
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="form-label font-medium text-sm">
          Email
        </label>
        <input
          id="email" // Vital para accesibilidad
          type="email"
          placeholder="admin@devlog.local"
          // Combinamos tus clases base con un borde rojo condicional si hay error
          className={`form-input rounded-md border px-3 py-2 ${
            errors.email
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300"
          }`}
          {...register("email")}
        />
        {/* Renderizado condicional del mensaje de error de Zod */}
        {errors.email && (
          <span className="text-xs font-medium text-red-500 animate-in fade-in">
            {errors.email.message as string}
          </span>
        )}
      </div>

      {/* Grupo Password */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="form-label font-medium text-sm">
          Password
        </label>
        <input
          id="password" // Vital para accesibilidad
          type="password"
          placeholder="••••••••"
          className={`form-input rounded-md border px-3 py-2 ${
            errors.password
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300"
          }`}
          {...register("password")}
        />
        {errors.password && (
          <span className="text-xs font-medium text-red-500 animate-in fade-in">
            {errors.password.message as string}
          </span>
        )}
      </div>

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
