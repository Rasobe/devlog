"use client";

import { Button, TextField } from "@/presentation/components/common";
import { useLoginForm } from "./useLoginForm";

export const LoginForm = () => {
  const { loginForm, onSubmit, isLoading } = useLoginForm();
  const {
    register,
    formState: { errors },
  } = loginForm;

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-6">
      <TextField
        id="email"
        label="Email"
        type="email"
        placeholder="admin@devlog.local"
        error={errors.email?.message}
        {...register("email")}
      />

      <TextField
        id="password"
        label="Password"
        type="password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register("password")}
      />

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
