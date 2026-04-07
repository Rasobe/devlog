import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ROUTES } from "@/presentation/config/routes";

import { useAuthContext } from "@/presentation/store/auth-context/AuthContext";
import {
  defaultLoginValues,
  loginSchema,
  type LoginSchema,
} from "@/presentation/schemas/auth.schema";
import { getErrorMessage } from "@/core/utils";

export const useLoginForm = () => {
  const router = useRouter();
  const { login } = useAuthContext();
  const [serverError, setServerError] = useState<string | null>(null);

  const loginForm = useForm<LoginSchema>({
    defaultValues: defaultLoginValues,
    resolver: zodResolver(loginSchema),
  });

  const onSubmitHandler = async (data: LoginSchema) => {
    setServerError(null);

    try {
      await login(data.email, data.password);

      router.push(ROUTES.DASHBOARD);
    } catch (error: unknown) {
      setServerError(getErrorMessage(error));
    }
  };

  return {
    loginForm,
    onSubmit: loginForm.handleSubmit(onSubmitHandler),
    isLoading: loginForm.formState.isSubmitting,
    serverError,
  };
};
