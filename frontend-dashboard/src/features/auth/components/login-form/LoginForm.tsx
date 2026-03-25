"use client";

import { useLoginForm } from "./useLoginForm";

export const LoginForm = () => {
  const { loginForm, onSubmit } = useLoginForm();

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          placeholder="admin@devlog.local"
          className="form-input"
          {...loginForm.register("email")}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          placeholder="••••••••"
          className="form-input"
          {...loginForm.register("password")}
        />
      </div>

      <button
        type="submit"
        className="btn btn-gradient mt-2 w-full py-3.5 text-base"
      >
        Sign In
      </button>
    </form>
  );
};
