"use client";

import { Button, TextField } from "@/presentation/components/global";
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

      {/* Botón de Submit con estado de carga nativo */}
      <Button
        type="submit"
        variant="gradient"
        isLoading={isLoading}
        className="mt-2 w-full py-3.5 text-base font-semibold"
      >
        Sign In
      </Button>
    </form>
  );
};
